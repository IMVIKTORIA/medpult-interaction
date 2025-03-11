import React, { useEffect, useRef, useState } from "react";

import {
  InteractionsData, InteractionsChannel
} from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import InteractionsHeader from "../InteractionsHeader/InteractionsHeader";
import Loader from "../Loader/Loader";
import InteractionRow from "./InteractionRow/InteractionRow";

/** Пропсы  */
type InteractionsListProps = {
  /** id задачи */
  appealId: string;
};

/** Список согласований */
function InteractionsList({ appealId }: InteractionsListProps) {
  const [isShowCommentModal, setIsShowCommentModal] = useState<boolean>(false);
  const [isShowCallInModal, setIsShowCallInModal] = useState<boolean>(false);
  const [isShowCallOutModal, setIsShowCallOutModal] = useState<boolean>(false);
  const [isShowSmsInModal, setIsShowSmsInModal] = useState<boolean>(false);
  const [isShowSmsOutModal, setIsShowSmsOutModal] = useState<boolean>(false);
  const [isShowEmailInModal, setIsShowEmailInModal] = useState<boolean>(false);
  const [isShowEmailOutModal, setIsShowEmailOutModal] = useState<boolean>(false);

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

  const loadData = async (
    items: InteractionsData[] = [],
    page: number = 0,
    hasMore: boolean = true
  ) => {
    if (isLoading) return;
    if (!hasMore) return;

    setIsLoading(true);

    const fetchData = await Scripts.getInteractions(appealId);
    setHasMore(fetchData.hasMore);

    setItems([...items, ...fetchData.data]);
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
  const updateElementsCount = async () => {
    const newCount = await Scripts.getInteractionsCount();
    if (newCount !== elementsCount) {
      setElementsCount(newCount);
    }
  };

  // Интервал для проверки количества взаимодействий
  useEffect(() => {
    updateElementsCount();
    const interval = setInterval(updateElementsCount, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!elementsCount) return;
    reloadData();
  }, [elementsCount]);

  // Запись количества непросмотренных
  useEffect(() => {
    const unviewedItems = items.filter((item) => !item.isViewed);

    Scripts.setNewInteractionsCountRequest(unviewedItems.length);
  }, [items]);

  return (
    <div className="custom-list-interaction">
      {/* Заголовок */}
      <InteractionsHeader
        setSelectedChannels={setSelectedChannels}
        modalStates={modalStates}
      />
      {/* Тело */}
      <div
        className={`custom-list-interaction__body`}
        ref={bodyRef}
        onScroll={onScroll}
      >
        {/* Данные */}
        {items.map((data) => (
          <InteractionRow
            data={data}
            items={items}
            setItems={setItems}
            openRowIndex={openRowIndex}
            setOpenRowIndex={setOpenRowIndex}
            reloadData={reloadData}
            selectedChannels={selectedChannels}
          />
        ))}

        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default InteractionsList;
