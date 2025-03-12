import React, { useEffect, useState } from "react";
import {
  InteractionsData,
  ListColumnData,
  InteractionsChannel,
  InteractionsCommentData,
  InteractionsEmailData,
  InteractionsCallData,
} from "../../../shared/types";
import Scripts from "../../../shared/utils/clientScripts";
import Loader from "../../Loader/Loader";
import InteractionsEmail from "../../InteractionsChannels/InteractionsEmail/InteractionsEmail";
import InteractionsComment from "../../InteractionsChannels/InteractionsComment/InteractionsComment";
import InteractionsCall from "../../InteractionsChannels/InteractionsCall/InteractionsCall";
import InteractionsSms from "../../InteractionsChannels/InteractionsSms/InteractionsSms";
import ModalManager from "../../InteractionsModal/ModalManager";
import moment from "moment";
import InteractionChannelColumn from "../InteractionRow/InteractionChannelColumn/InteractionChannelColumn";
import InteractionListColumn from "../InteractionRow/InteractionListColumn/InteractionListColumn";

/** Пропсы */
class InteractionsDetailsProps {
  /** Данные взаимодействия */
  data: InteractionsData;
  /** Обработчик нажатия на строку */
  onClickRowHandler: () => any;
  /** Перезагрузить список */
  reloadData: () => void;
  /** Список взаимодействий */
  items: InteractionsData[];
  /** Установить список взаимодействий */
  setItems: React.Dispatch<React.SetStateAction<InteractionsData[]>>;
  /** Идентификатор задачи */
  taskId?: string;
}

/** Детальная форма согласования */
function InteractionsDetails(props: InteractionsDetailsProps) {
  const { data, reloadData, items, setItems, taskId } = props;

  const [isShowCommentModal, setIsShowCommentModal] = useState<boolean>(false);
  const [isShowCallInModal, setIsShowCallInModal] = useState<boolean>(false);
  const [isShowCallOutModal, setIsShowCallOutModal] = useState<boolean>(false);
  const [isShowSmsInModal, setIsShowSmsInModal] = useState<boolean>(false);
  const [isShowSmsOutModal, setIsShowSmsOutModal] = useState<boolean>(false);
  const [isShowEmailInModal, setIsShowEmailInModal] = useState<boolean>(false);
  const [isShowEmailOutModal, setIsShowEmailOutModal] =
    useState<boolean>(false);

  // Флаг загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Данные комментария
  const [interactionsCommentData, setInteractionsCommentData] =
    useState<InteractionsCommentData>();
  // Получить данные комментария
  const fetchInteractionsComment = async () => {
    if (data?.channel !== InteractionsChannel.comment) return;

    const commentData = await Scripts.getInteractionsComment(data.id);
    setInteractionsCommentData(commentData);
  };

  // Данные  письма
  const [interactionsEmailData, setInteractionsEmailData] =
    useState<InteractionsEmailData>();
  // Получить данные письма
  const fetchInteractionsEmail = async () => {
    if (
      data?.channel !== InteractionsChannel.incomingEmail &&
      data?.channel !== InteractionsChannel.outgoingEmail
    )
      return;

    const emailData = await Scripts.getInteractionsEmail(data.id);
    setInteractionsEmailData(emailData);
  };

  // Данные звонка
  const [interactionsCallData, setinteractionsCallData] =
    useState<InteractionsCallData>();
  // Получить данные звока
  const fetchInteractionsCall = async () => {
    if (
      data?.channel !== InteractionsChannel.incomingCall &&
      data?.channel !== InteractionsChannel.outgoingCall
    )
      return;

    const callData = await Scripts.getInteractionsCall(data.id);
    setinteractionsCallData(callData);
  };

  // Данные смс
  const [interactionsSmsData, setinteractionsSmsData] =
    useState<InteractionsCallData>();
  // Получить данные смс
  const fetchInteractionsSms = async () => {
    if (
      data?.channel !== InteractionsChannel.incomingSms &&
      data?.channel !== InteractionsChannel.outgoingSms
    )
      return;

    const smsData = await Scripts.getInteractionsSms(data.id);
    setinteractionsSmsData(smsData);
  };

  // Перезагрузить данные формы
  const reloadFulldata = () => {
    fetchInteractionsComment();
    fetchInteractionsEmail();
    fetchInteractionsCall();
    fetchInteractionsSms();
  };

  // Изначальная загрузка данных
  React.useLayoutEffect(() => {
    reloadFulldata();
  }, []);

  const handleRemoveClick = async () => {
    await Scripts.deleteInteraction(data.id);
    reloadData();
  };

  const closeModal = () => {
    setIsShowCommentModal(false);
    setIsShowCallInModal(false);
    setIsShowCallOutModal(false);
    setIsShowSmsInModal(false);
    setIsShowSmsOutModal(false);
    setIsShowEmailInModal(false);
    setIsShowEmailOutModal(false);
  };

  /** Показывать кнопки удаления и редактирования? */
  const checkCanShowEditButton = (): boolean => {
    // Не показывать для автоматического
    if(data.isSystem) return false;

    // Дата создания
    const createDateStr = data.createdAt;
    const createDate = moment(createDateStr);
    // Текущая дата
    const currentDate = moment();

    // Если текущая дата меньше или равна 60 минут после даты создания, то показать кнопки
    return currentDate.isSameOrBefore(createDate.add(60, "minute"));
  };

  /** Показывать кнопки изменения и удаления? */
  const [isShowEditButtons, setIsShowEditButtons] = useState<boolean>(
    checkCanShowEditButton
  );

  /** При отрисовке поставить таймер чтобы скрыть кнопки динамически */
  useEffect(() => {
    // Если кнопки не показаны, то не весить таймер
    if (!checkCanShowEditButton()) return;

    // Дата создания
    const createDateStr = data.createdAt;
    const createDate = moment(createDateStr, "DD.MM.YYYY HH:mm");
    // Текущая дата
    const currentDate = moment();
    // Разница между текущей датой и 60 минут после создания
    const duration = createDate.add(60, "minute").diff(currentDate);

    // Таймер для обновления отображения кнопок
    const timeout = setTimeout(() => {
      setIsShowEditButtons(checkCanShowEditButton());
    }, duration);

    // Удалить таймер при закрытии
    return () => clearTimeout(timeout);
  }, []);

  /** Изменить флажок просмотренности */
  useEffect(() => {
    // Если просмотрено, выйти
    if (data.isViewed) return;

    // Обновить в системе
    Scripts.updateIsInteractionViewed(data.id);

    const newItems = items;
    const currentItemIndex = newItems.findIndex((item) => item.id == data.id);
    // Если не найдено
    if (currentItemIndex < 0) return;

    newItems[currentItemIndex].isViewed = true;

    // Обновить счетчик
    const unviewedItems = newItems.filter((item) => !item.isViewed);
    Scripts.setNewInteractionsCountRequest(unviewedItems.length);

    // Обновить значение просмотрено на форме
    setItems(newItems);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="custom-list-row-approval custom-list-row-approval_openable amendment-details">
          <Loader />
        </div>
      ) : (
        <div className="interactions-details">
          {/* Модальные окна */}
          <ModalManager
            isShowCommentModal={isShowCommentModal}
            isShowCallInModal={isShowCallInModal}
            isShowCallOutModal={isShowCallOutModal}
            isShowSmsInModal={isShowSmsInModal}
            isShowSmsOutModal={isShowSmsOutModal}
            isShowEmailInModal={isShowEmailInModal}
            isShowEmailOutModal={isShowEmailOutModal}
            closeModal={closeModal}
            interactionId={data.id}
            initialText={data.comment}
            initialFio={data.fio}
            initialPhone={data.numberPhone}
            initialLogChan={data.logChan}
            reloadData={reloadData}
          />

          <div className="interactions-details__content">
            {data.channel &&
              data.channel === InteractionsChannel.comment &&
              interactionsCommentData && (
                <InteractionsComment
                  interactionsCommentData={interactionsCommentData}
                  setIsShowCommentModal={setIsShowCommentModal}
                  handleRemoveClick={handleRemoveClick}
                  isShowEditButtons={isShowEditButtons}
                />
              )}
            {data.channel &&
              (data.channel === InteractionsChannel.incomingEmail ||
                data.channel === InteractionsChannel.outgoingEmail) &&
              interactionsEmailData && (
                <InteractionsEmail
                  interactionId={data.id}
                  interactionsEmailData={interactionsEmailData}
                  handleRemoveClick={handleRemoveClick}
                  channelCode={data.channel}
                  setIsShowEmailInModal={setIsShowEmailInModal}
                  setIsShowEmailOutModal={setIsShowEmailOutModal}
                  isShowEditButtons={isShowEditButtons}
                  isSystem={data.isSystem}
                  taskId={taskId}
                />
              )}
            {data.channel &&
              (data.channel === InteractionsChannel.incomingCall ||
                data.channel === InteractionsChannel.outgoingCall) &&
              interactionsCallData && (
                <InteractionsCall
                  interactionsCallData={interactionsCallData}
                  handleRemoveClick={handleRemoveClick}
                  channelCode={data.channel}
                  setIsShowCallInModal={setIsShowCallInModal}
                  setIsShowCallOutModal={setIsShowCallOutModal}
                  isShowEditButtons={isShowEditButtons}
                />
              )}
            {data.channel &&
              (data.channel === InteractionsChannel.incomingSms ||
                data.channel === InteractionsChannel.outgoingSms) &&
              interactionsSmsData && (
                <InteractionsSms
                  interactionId={data.id}
                  interactionsSmsData={interactionsSmsData}
                  handleRemoveClick={handleRemoveClick}
                  channelCode={data.channel}
                  setIsShowSmsInModal={setIsShowSmsInModal}
                  setIsShowSmsOutModal={setIsShowSmsOutModal}
                  isShowEditButtons={isShowEditButtons}
                />
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default InteractionsDetails;
