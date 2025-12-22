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
import { ModalsState } from "./InteractionsListTypes";
import { useModalStates } from "./InteractionsListHooks";

function useUpdateList(appealId: string, taskId?: string) {
  // Дата последнего обновления взаимодействия из списка
  const [lastUpdateDate, setLastUpdateDate] = useState(new Date().getTime());

  async function updateList() {
    const lastUpdateDate = await Scripts.getLastUpdateDate(appealId, taskId);
    if (lastUpdateDate) setLastUpdateDate(lastUpdateDate.getTime());
  }

  const interval = useRef<NodeJS.Timeout>();

  // Для очистки интервала при переходе на другую страницу
  const originalPath = window.location.pathname;

  // Интервал для проверки количества взаимодействий
  useEffect(() => {
    updateList();

    interval.current = setInterval(() => {
      const currentPath = window.location.pathname;
      if (currentPath != originalPath) {
        clearInterval(interval.current);
        return;
      }

      updateList();
    }, 3000);

    return () => clearInterval(interval.current);
  }, []);

  return { lastUpdateDate };
}

/** Пропсы  */
type InteractionsListProps = {
  /** id обращения */
  appealId: string;
  /** id задачи */
  taskId?: string;
};

/** Список согласований */
function InteractionsList({ appealId, taskId }: InteractionsListProps) {
  const { modalStates } = useModalStates();

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

    setHasMore(fetchData.hasMore);

    //setItems([...items, ...fetchData.data]);
    setItems(processedData);
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

  const { lastUpdateDate } = useUpdateList(appealId, taskId);

  useEffect(() => {
    reloadData();
  }, [/* elementsCount */ lastUpdateDate, appealId, taskId]);

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

  // Функция сортировки массива GroupData[] по полю interaction.createdAt
  function sortGroupDataByCreatedAt(data: GroupData[]) {
    // Получаем текущую дату для сравнения
    const currentDate = moment();

    return data.sort((a, b) => {
      let dateA = a.interaction.createdAt;
      let dateB = b.interaction.createdAt;

      // Если дата в формате "HH:mm", добавляем текущую дату перед временем
      if (!/\d{2}\.\d{2}\.\d{4}/.test(dateA)) {
        dateA = `${currentDate.format("DD.MM.YYYY")} ${dateA}`;
      }
      if (!/\d{2}\.\d{2}\.\d{4}/.test(dateB)) {
        dateB = `${currentDate.format("DD.MM.YYYY")} ${dateB}`;
      }

      // Преобразуем строки в моменты времени
      const momentA = moment(dateA, "DD.MM.YYYY HH:mm");
      const momentB = moment(dateB, "DD.MM.YYYY HH:mm");

      // Возвращаем разницу моментов времени
      return momentB.diff(momentA);
    });
  }

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

    const groups: GroupData[] = [];

    // Обработка сгруппированных писем
    emailGroups.forEach((emailGroup, sessionId) => {
      // cамое свежее письмо в цепочке
      const latestInteraction = emailGroup.reduce((latest, current) =>
        moment(current.createdAt).isAfter(moment(latest.createdAt))
          ? current
          : latest
      );

      const group = new GroupData();
      group.interaction = latestInteraction;
      group.interactions = emailGroup;
      group.groupType = GroupType.email;
      group.sessionId = sessionId;
      groups.push(group);
      // const group = new GroupData();
      // group.interaction = emailGroup[emailGroup.length - 1];
      // group.interactions = emailGroup;
      // group.groupType = GroupType.email;
      // group.sessionId = sessionId;
      // groups.push(group);
    });

    // Обработка независимых элементов
    for (const item of nonEmailItems) {
      const group = new GroupData();
      group.interaction = item;
      group.groupType = GroupType.default;
      groups.push(group);
    }

    return sortGroupDataByCreatedAt(groups);
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
          if (data.groupType === GroupType.email) {
            if (!data.interactions?.length) return null;

            if (data.interactions.length > 1) {
              // Цепочка писем
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
            } else {
              // Одиночное письмо
              return (
                <InteractionRow
                  key={data.interactions[0].id}
                  data={data.interactions[0]}
                  items={items}
                  setItems={setItems}
                  openRowIndex={openRowIndex}
                  setOpenRowIndex={setOpenRowIndex}
                  reloadData={reloadData}
                  selectedChannels={selectedChannels}
                  taskId={taskId}
                  modalStates={modalStates}
                />
              );
            }
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
              modalStates={modalStates}
            />
          );
        })}

        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default InteractionsList;
