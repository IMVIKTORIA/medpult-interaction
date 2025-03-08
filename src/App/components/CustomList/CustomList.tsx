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
  /** Получение формы создания */
  getCreateLayout?: ({
    reloadData,
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
};

function CustomList(props: ListProps) {
  const {
    columnsSettings,
    getDataHandler,
    searchData,
    setSearchHandler,
    isScrollable = true,
    getDetailsLayout,
    getCreateLayout,
    isCreateMode,
    closeCreateMode,
    defaultOpenRowId,
    modalStates,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [sortData, setSortData] = useState<SortData>();
  const [items, setItems] = useState<InteractionsData[]>([]);
  const [openRowIndex, setOpenRowIndex] = useState<string>();
  /** Выбранные каналы */
  const [selectedChannels, setSelectedChannels] = useState<InteractionsChannel[]>([InteractionsChannel.allChannel]);

  const bodyRef = useRef<HTMLDivElement>(null);

  const [columnWidth, setColumnWidth] = useState(columnsSettings[0].fr); // начальная ширина

  const handleColumnResize = (newWidth) => {
    setColumnWidth(newWidth);
  };

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
    console.log("defaultOpenRowId: ", defaultOpenRowId);
  }, []);

  useEffect(() => {
    console.log("openRowIndex: ", openRowIndex);
  }, [openRowIndex]);

  /** Установить обработчик нажатия на кнопку поиск */
  useEffect(() => {
    Scripts.setOpenInteractionsCallback((id: string) => setOpenRowIndex(id));
    if (!setSearchHandler) return;

    setSearchHandler(() => () => {
      reloadData();
    });
  }, [searchData]);

  /** Обновление оглавления при изменении сортировки */
  useEffect(() => {
    reloadData();
  }, [sortData]);

  /** Обновление оглавления при изменении сортировки */
  useEffect(() => {
    if (isCreateMode) setOpenRowIndex(undefined);
  }, [isCreateMode]);

  /** Нажатие на сортировку */
  const handleSortClick = (sortDataNew: SortData | undefined) => {
    setSortData(sortDataNew);
  };

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
        {/* Форма создания */}
        {isCreateMode &&
          getCreateLayout &&
          getCreateLayout({
            reloadData: reloadData,
            onClickRowHandler: () => {},
          })}

        {/* Данные */}
        {items.map((data) => {
          console.log(data.channel)
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
            />
          );
        })}

        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default CustomList;
