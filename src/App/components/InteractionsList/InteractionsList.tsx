import React, { useEffect, useState } from "react";

import {
  InteractionsData,
  InputDataCategory,
  ListColumnData,
  getDetailsLayoutAttributes,
} from "../../shared/types";
import CustomList from "../CustomList/CustomList";
import Scripts from "../../shared/utils/clientScripts";
import utils, { useMapState } from "../../shared/utils/utils";
import InteractionsDetails from "./InteractionsDetails/InteractionsDetails";
import Button from "../CustomButton/CustomButton";

/** Пропсы  */
type InteractionsListProps = {
  /** id задачи */
  appealId: string;
  handler: any;
  isViewMode: any;
  saveStateHandler: any;
  setSelectedForma: any;
  onRowClick: any;
};

/** Список согласований */
function InteractionsList({
  appealId,
  handler,
  isViewMode,
  saveStateHandler,
  setSelectedForma,
  onRowClick,
}: InteractionsListProps) {
  const onClickRevokeTask = async (props: InputDataCategory) => {
    const appealId = props.data.code;
    if (!appealId) return;
    // Установка обращения
    const requestId = await Scripts.getRequestIdByTaskId(appealId);
    utils.setRequest(requestId);

    localStorage.setItem("appealId", appealId);

    // Переход
    // const link = await Scripts.getRequestLink()
    // utils.redirectSPA(link)
    window.location.reload();
  };

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Канал",
      code: "channel",
      fr: 0.5,
      isSortable: false,
      isIcon: true,
    }),
    new ListColumnData({
      name: "Пользователь",
      code: "fio",
      fr: 1,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Тема",
      code: "topic",
      fr: 1,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Краткое содержание",
      code: "comment",
      fr: 3,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Задача",
      code: "numberTask",
      fr: 1,
      isSortable: false,
      isLink: true,
    }),
    new ListColumnData({
      name: "Дата и время",
      code: "startDate",
      fr: 1,
      isSortable: false,
    }),
  ];

  // Данные формы деталей ДС
  const [amendmentValues, setAmendmentValue, setAmendmentValues] =
    useMapState<InteractionsData>(new InteractionsData());

  const [isShowCommentModal, setIsShowCommentModal] = useState<boolean>(false);
  const [isShowCallInModal, setIsShowCallInModal] = useState<boolean>(false);
  const [isShowCallOutModal, setIsShowCallOutModal] = useState<boolean>(false);
  const [isShowSmsInModal, setIsShowSmsInModal] = useState<boolean>(false);
  const [isShowSmsOutModal, setIsShowSmsOutModal] = useState<boolean>(false);
  const [isShowEmailInModal, setIsShowEmailInModal] = useState<boolean>(false);
  const [isShowEmailOutModal, setIsShowEmailOutModal] = useState<boolean>(false);

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

  /** Получение формы детальной информации по строке списка ДС */
  const getAmendmentDetailsLayout = ({
    rowData,
    reloadData,
    onClickRowHandler,
  }: getDetailsLayoutAttributes) => {
    return (
      <InteractionsDetails
        reloadData={reloadData}
        columnsSettings={columns}
        data={rowData}
        values={amendmentValues}
        setValue={setAmendmentValue}
        setValues={setAmendmentValues}
        onClickRowHandler={onClickRowHandler}
        setSelectedForma={setSelectedForma}
        onRowClick={onRowClick}
        // modalStates={modalStates}
      />
    );
  };

  // Количество взаимодействий
  const [elementsCount, setElementsCount] = useState<number>(0);
  const [reloadCallback, setReloadCallback] = useState<any>();

  // Интервал для проверки количества взаимодействий
  useEffect(() => {
    if(!appealId) return;
    if(!reloadCallback) return;

    const interval = setInterval(async () => {
      const newCount = await Scripts.getInteractionsCount();
      if (newCount !== elementsCount) {
        setElementsCount(newCount);
        reloadCallback(); // Обновляем список взаимодействий, если количество изменилось
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [appealId, reloadCallback]);

  const setSearchHandler = (callback: any) => {
    Scripts.setReloadInteractionsCallback(callback);
    setReloadCallback(callback)
  }

  return (
    <div className="amendment-tab">
      <CustomList
        getDetailsLayout={getAmendmentDetailsLayout}
        columnsSettings={columns}
        getDataHandler={() => Scripts.getInteractions(appealId)}
        isScrollable={false}
        setSearchHandler={Scripts.setReloadInteractionsCallback}
        modalStates={modalStates}
      />
    </div>
  );
}

export default InteractionsList;
