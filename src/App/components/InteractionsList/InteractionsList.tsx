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
  taskId: string;
};

/** Список согласований */
function InteractionsList({ taskId }: InteractionsListProps) {
  const onClickRevokeTask = async (props: InputDataCategory) => {
    const taskId = props.data.code;
    if (!taskId) return;
    // Установка обращения
    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    utils.setRequest(requestId);

    localStorage.setItem("taskId", taskId);

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
  const [isShowEmailOutModal, setIsShowEmailOutModal] =
    useState<boolean>(false);

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

  const [items, setItems] = useState<InteractionsData[]>([]);
  /** Получение формы детальной информации*/
  const getDetailsLayout = ({
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
        items={items}
        setItems={setItems}
      />
    );
  };

  return (
    <div className="amendment-tab">
      <CustomList
        getDetailsLayout={getDetailsLayout}
        columnsSettings={columns}
        getDataHandler={() => Scripts.getInteractionsTask(taskId)}
        isScrollable={false}
        setSearchHandler={Scripts.setReloadInteractionsTaskCallback}
        modalStates={modalStates}
        items={items}
        setItems={setItems}
        taskId={taskId}
      />
    </div>
  );
}

export default InteractionsList;
