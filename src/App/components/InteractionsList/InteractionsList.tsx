import React, { useEffect, useRef, useState } from "react";

import {
  InteractionsData,
  InteractionsChannel,
  GroupData,
  GroupType,
} from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import InteractionsHeader from "../InteractionsHeader/InteractionsHeader";
import Loader from "../Loader/Loader";
import InteractionRow from "./InteractionRow/InteractionRow";
import SessionRow from "./SessionRow/SessionRow";
import moment from "moment";

/** Пропсы  */
type InteractionsListProps = {
  /** id обращения */
  appealId: string;
  /** id задачи */
  taskId?: string;
};

/** Список согласований */
function InteractionsList({ appealId, taskId }: InteractionsListProps) {
  const [isShowCommentModal, setIsShowCommentModal] = useState<boolean>(false);
  const [isShowCallInModal, setIsShowCallInModal] = useState<boolean>(false);
  const [isShowCallOutModal, setIsShowCallOutModal] = useState<boolean>(false);
  const [isShowSmsInModal, setIsShowSmsInModal] = useState<boolean>(false);
  const [isShowSmsOutModal, setIsShowSmsOutModal] = useState<boolean>(false);
  const [isShowEmailInModal, setIsShowEmailInModal] = useState<boolean>(false);
  const [isShowEmailOutModal, setIsShowEmailOutModal] =
    useState<boolean>(false);

  /** Состояние модального окна TODO: Опираться на одно булево состояние и передавать канал взаимодействия */
  const modalStates = {
    isShowCommentModal,
    setIsShowCommentModal,
    isShowCallInModal,
    setIsShowCallInModal,
    isShowCallOutModal,
    setIsShowCallOutModal,
    isShowSmsInModal,
    setIsShowSmsInModal,
    isShowSmsOutModal,
    setIsShowSmsOutModal,
    isShowEmailInModal,
    setIsShowEmailInModal,
    isShowEmailOutModal,
    setIsShowEmailOutModal,
  };

  // TODO: Убрать
  const [page, setPage] = useState<number>(0);
  // TODO: Убрать
  const [hasMore, setHasMore] = useState<boolean>(true);
  /** Значения списка взаимодействий TODO: Добавить обработку Сессий (цепочек писем) */
  const [items, setItems] = useState<InteractionsData[]>([]);
  /** Состояние загрузки */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** Индекс раскрытой строки */
  const [openRowIndex, setOpenRowIndex] = useState<string>();
  /** Выбранные каналы (Все каналы по-умолчанию)*/
  const [selectedChannels, setSelectedChannels] = useState<
    InteractionsChannel[]
  >([InteractionsChannel.allChannel]);

  const bodyRef = useRef<HTMLDivElement>(null);

  const reloadData = () => {
    setIsLoading(false);
    setItems([]);

    loadData();
  };
  useEffect(() => {
    Scripts.setUpdateInteractionCallback(reloadData);
  }, [appealId, taskId]);

  /** Загрузить взаимодействия */
  const loadData = async (
    items: InteractionsData[] = [],
    page: number = 0,
    hasMore: boolean = true
  ) => {
    if (isLoading) return;
    if (!hasMore) return;

    setIsLoading(true);

    const fetchData = await Scripts.getInteractions(appealId, taskId);

    // Помечаем взаимодействия текущего пользователя как просмотренные
    const processedData = fetchData.data.map((item) => ({
      ...item,
      isViewed: item.isUser ? true : item.isViewed,
    }));

    const filteredData = processedData.filter(
      (item) => item.status.code !== "processed"
    );

    setHasMore(fetchData.hasMore);

    //setItems([...items, ...fetchData.data]);
    setItems(filteredData);
    setPage(page + 1);
    setIsLoading(false);
  };

  const onScroll = () => {
    const body = bodyRef.current!;
    const height = body.scrollHeight - body.offsetHeight;
    const scrollPosition = body.scrollTop;

    if ((height - scrollPosition) / height < 0.05 && !isLoading) {
      loadData(items, page, hasMore);
    }
  };

  const [elementsCount, setElementsCount] = useState<number>(items.length);
  /** Обновить количество элементов */
  const updateElementsCount = async (interval?: NodeJS.Timeout) => {
    try {
      const newCount = await Scripts.getInteractionsCount(taskId);
      if (newCount !== elementsCount) {
        setElementsCount(newCount);
      }
    } catch (e) {
      // Очитска интервала при переходе на другую страницу
      clearInterval(interval);
    }
  };

  // Интервал для проверки количества взаимодействий
  useEffect(() => {
    updateElementsCount();
    const interval = setInterval(() => {
      updateElementsCount(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    reloadData();
  }, [elementsCount, appealId, taskId]);

  // Запись количества непросмотренных
  useEffect(() => {
    //const unviewedItems = items.filter((item) => !item.isViewed);
    const unviewedItems = items.filter(
      (item) => !item.isViewed && !item.isUser
    );
    if (taskId) {
      Scripts.setNewInteractionsCountTask(unviewedItems.length);
    } else {
      Scripts.setNewInteractionsCountRequest(unviewedItems.length);
    }
  }, [items]);

  /** Получение сгруппированных взаимодействий */
  const getGroupedItems = (items: InteractionsData[]) => {
    // Группируем письма по sessionId
    const emailGroups = new Map<string, InteractionsData[]>();
    const nonEmailItems: InteractionsData[] = [];

    for (const item of items) {
      if (
        [
          InteractionsChannel.incomingEmail,
          InteractionsChannel.outgoingEmail,
        ].includes(item.channel) &&
        item.sessionId
      ) {
        if (!emailGroups.has(item.sessionId)) {
          emailGroups.set(item.sessionId, []);
        }
        emailGroups.get(item.sessionId)?.push(item);
      } else {
        nonEmailItems.push(item);
      }
    }

    // Сортируем только независимые элементы (не email)
    const sortedNonEmailItems = [...nonEmailItems].sort((a, b) => {
      const dateA = moment(a.createdAt, "DD.MM.YYYY HH:mm");
      const dateB = moment(b.createdAt, "DD.MM.YYYY HH:mm");
      return dateB.diff(dateA);
    });

    const groups: GroupData[] = [];

    // Обработка сгруппированных писем
    emailGroups.forEach((emailGroup, sessionId) => {
      const group = new GroupData();
      group.interaction = emailGroup[0];
      group.interactions = emailGroup;
      group.groupType = GroupType.email;
      group.sessionId = sessionId;
      groups.push(group);
    });

    // Обработка независимых элементов
    for (const item of sortedNonEmailItems) {
      const group = new GroupData();
      group.interaction = item;
      group.groupType = GroupType.default;
      groups.push(group);
    }

    groups.sort((a, b) => {
      const dateA = moment(a.interaction.createdAt, "DD.MM.YYYY HH:mm");
      const dateB = moment(b.interaction.createdAt, "DD.MM.YYYY HH:mm");
      return dateB.diff(dateA);
    });

    return groups;
  };

  return (
    <div className="custom-list-interaction">
      {/* Заголовок */}
      <InteractionsHeader
        setSelectedChannels={setSelectedChannels}
        modalStates={modalStates}
        taskId={taskId}
      />
      {/* Тело */}
      <div
        className={`custom-list-interaction__body_scrollable`}
        ref={bodyRef}
        onScroll={onScroll}
      >
        {/* Данные */}
        {getGroupedItems(items).map((data) => {
          if (data.groupType == GroupType.email) {
            if (!data.interactions?.length) return;

            return (
              <SessionRow
                interactions={data.interactions}
                items={items}
                setItems={setItems}
                openRowIndex={openRowIndex}
                setOpenRowIndex={setOpenRowIndex}
                reloadData={reloadData}
                selectedChannels={selectedChannels}
                taskId={taskId}
              />
            );
          }

          return (
            <InteractionRow
              data={data.interaction}
              items={items}
              setItems={setItems}
              openRowIndex={openRowIndex}
              setOpenRowIndex={setOpenRowIndex}
              reloadData={reloadData}
              selectedChannels={selectedChannels}
              taskId={taskId}
            />
          );
        })}

        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default InteractionsList;
