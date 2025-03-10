import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  InputDataCategory,
  ListColumnData,
  SortData,
  getDetailsLayoutAttributes,
  InteractionsData,
  GetInteractionsResponse,
  InteractionsChannel,
} from "../../shared/types";
import icons from "../../shared/icons";
import CustomListColumn from "./CustomListHeaderColumn/CustomListHeaderColumn";
import Loader from "../Loader/Loader";
import CustomListRow from "./CustomListRow/CustomListRow";
import Scripts from "../../shared/utils/clientScripts";
import InteractionsHeader from "../../components/InteractionsHeader/InteractionsHeader";

type ListProps = {
  /** Основные настройки */
  /** Настройки отображения колонок */
  columnsSettings: ListColumnData[];
  /** Получение данных */
  getDataHandler: () => Promise<GetInteractionsResponse>;
  /** Есть прокрутка? */
  isScrollable?: boolean;

  /** Настройки поиска */
  /** Данные поиска */
  searchData?: any;
  /** Установка обработчика нажатия на поиск */
  setSearchHandler?: any;

  /** Получение формы детальной информации по вкладке */
  getDetailsLayout?: ({
    rowData,
    onClickRowHandler,
  }: getDetailsLayoutAttributes) => any;

  /** Режим создания */
  isCreateMode?: boolean;
  /** toggle Режим создания */
  closeCreateMode?: () => any;
  /** Открытая строка по-умолчанию */
  defaultOpenRowId?: any;
  /** Состояния модалки */
  modalStates: {
    isShowCommentModal: boolean;
    setIsShowCommentModal: (value: boolean) => void;
    isShowCallInModal: boolean;
    setIsShowCallInModal: (value: boolean) => void;
    isShowCallOutModal: boolean;
    setIsShowCallOutModal: (value: boolean) => void;
    isShowSmsInModal: boolean;
    setIsShowSmsInModal: (value: boolean) => void;
    isShowSmsOutModal: boolean;
    setIsShowSmsOutModal: (value: boolean) => void;
    isShowEmailInModal: boolean;
    setIsShowEmailInModal: (value: boolean) => void;
    isShowEmailOutModal: boolean;
    setIsShowEmailOutModal: (value: boolean) => void;
  };
  /** Список взаимодействий */
  items: InteractionsData[];
  /** Установить список взаимодействий */
  setItems: React.Dispatch<React.SetStateAction<InteractionsData[]>>;
};

function CustomList(props: ListProps) {
  const {
    columnsSettings,
    getDataHandler,
    searchData,
    setSearchHandler,
    isScrollable = true,
    getDetailsLayout,
    isCreateMode,
    closeCreateMode,
    defaultOpenRowId,
    modalStates,
    items,
    setItems,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [sortData, setSortData] = useState<SortData>();
  const [openRowIndex, setOpenRowIndex] = useState<string>();
  /** Выбранные каналы */
  const [selectedChannels, setSelectedChannels] = useState<InteractionsChannel[]>([InteractionsChannel.allChannel]);

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

    const fetchData = await getDataHandler();
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

  React.useLayoutEffect(() => {
    if (defaultOpenRowId != undefined) setOpenRowIndex(defaultOpenRowId);
  }, []);

  /** Обновление оглавления при изменении сортировки */
  useEffect(() => {
    if (isCreateMode) setOpenRowIndex(undefined);
  }, [isCreateMode]);

  const [elementsCount, setElementsCount] = useState<number>(items.length);
  /** Обновить количество элементов */
  const updateElementsCount = async () => {
    const newCount = await Scripts.getInteractionsCount();
    if (newCount !== elementsCount) {
      setElementsCount(newCount);
    }
  }

  // Интервал для проверки количества взаимодействий
  useEffect(() => {
    updateElementsCount()
    const interval = setInterval(updateElementsCount, 3000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(!elementsCount) return;
    reloadData();
  }, [elementsCount])

  // Запись количества непросмотренных 
  useEffect(() => {
    const unviewedItems = items.filter(item => !item.isViewed);

    Scripts.setNewInteractionsCountRequest(unviewedItems.length);
  }, [items])

  return (
    <div className="custom-list-interaction">
      {/* Заголовок */}
      <div
        className={`custom-list-interaction__header${
          isScrollable ? " custom-list-interaction__header_scrollable" : ""
        }`}
      >
        <InteractionsHeader setSelectedChannels={setSelectedChannels} modalStates={modalStates} />
      </div>
      {/* Тело */}
      <div
        className={`custom-list-interaction__body${
          isScrollable ? " custom-list-interaction__body_scrollable" : ""
        }`}
        ref={bodyRef}
        onScroll={onScroll}
      >
        {/* Данные */}
        {items.map((data) => {
          /** Фильтрация по каналам */
          if(
            !selectedChannels.includes(InteractionsChannel.allChannel) // Если не выбраны все каналы
            && !selectedChannels.includes(data.channel.data.code as unknown as InteractionsChannel) // Если канал текущего элемента не находится в выбранных
          ) return;

          /** Обработчик нажатия на строку */
          const toggleShowDetails = () => {
            if (data.id === undefined) return;
            closeCreateMode && closeCreateMode();

            if (String(data.id) == openRowIndex) {
              setOpenRowIndex(undefined);
              return;
            }

            setOpenRowIndex(String(data.id));
          };

          return (
            <CustomListRow
              key={data.id}
              data={data as any}
              columnsSettings={columnsSettings}
              getDetailsLayout={getDetailsLayout}
              isShowDetails={
                getDetailsLayout && String(data.id) === openRowIndex
              }
              setOpenRowIndex={toggleShowDetails}
              reloadData={reloadData}
              isViewed={data.isViewed}
            />
          );
        })}

        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default CustomList;
