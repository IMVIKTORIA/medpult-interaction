import React, { useState } from "react";
import {
  InteractionsData,
  InteractionsRowData,
  DetailsProps,
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
import CustomListRow from "../../CustomList/CustomListRow/CustomListRow";
import ModalManager from "../../InteractionsModal/ModalManager";
class InteractionsDetailsProps implements DetailsProps {
  data: InteractionsRowData;
  values: InteractionsData;
  setValue: (name: string, value: any) => void;
  setValues: (values: InteractionsData) => void;
  columnsSettings: ListColumnData[];
  onClickRowHandler: () => any;
  reloadData: () => void;
  setSelectedForma: (forma: any) => void;
  onRowClick: () => void;
}

/** Детальная форма согласования */
function InteractionsDetails(props: InteractionsDetailsProps) {
  const {
    data,
    columnsSettings,
    onClickRowHandler,
    reloadData,
  } = props;

  const [isShowCommentModal, setIsShowCommentModal] = useState<boolean>(false);
  const [isShowCallInModal, setIsShowCallInModal] = useState<boolean>(false);
  const [isShowCallOutModal, setIsShowCallOutModal] = useState<boolean>(false);
  const [isShowSmsInModal, setIsShowSmsInModal] = useState<boolean>(false);
  const [isShowSmsOutModal, setIsShowSmsOutModal] = useState<boolean>(false);
  const [isShowEmailInModal, setIsShowEmailInModal] = useState<boolean>(false);
  const [isShowEmailOutModal, setIsShowEmailOutModal] = useState<boolean>(false);

  // Флаг загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Данные комментария
  const [interactionsCommentData, setInteractionsCommentData] = useState<InteractionsCommentData>();
  // Получить данные комментария
  const fetchInteractionsComment = async () => {
    if (data?.channel?.data?.code !== InteractionsChannel.comment) return;

    const commentData = await Scripts.getInteractionsComment(data.id);
    setInteractionsCommentData(commentData);
  };

  // Данные  письма
  const [interactionsEmailData, setInteractionsEmailData] = useState<InteractionsEmailData>();
  // Получить данные письма
  const fetchInteractionsEmail = async () => {
    if (
      data?.channel?.data?.code !== InteractionsChannel.incomingEmail &&
      data?.channel?.data?.code !== InteractionsChannel.outgoingEmail
    )
      return;

    const emailData = await Scripts.getInteractionsEmail(data.id);
    setInteractionsEmailData(emailData);
  };

  // Данные звонка
  const [interactionsCallData, setinteractionsCallData] = useState<InteractionsCallData>();
  // Получить данные звока
  const fetchInteractionsCall = async () => {
    if (
      data?.channel?.data?.code !== InteractionsChannel.incomingCall &&
      data?.channel?.data?.code !== InteractionsChannel.outgoingCall
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
      data?.channel?.data?.code !== InteractionsChannel.incomingSms &&
      data?.channel?.data?.code !== InteractionsChannel.outgoingSms
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
  }

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
            initialText={data.comment.value}
          />
          {/* Шапка */}
          <CustomListRow
            data={data as any}
            columnsSettings={columnsSettings}
            setOpenRowIndex={onClickRowHandler}
            reloadData={function () {}}
            isOpen
            isClickable
          />
          <div className="interactions-details__content">
            {data.channel &&
              data.channel.data.code === InteractionsChannel.comment &&
              interactionsCommentData && (
                <InteractionsComment
                  interactionsCommentData={interactionsCommentData}
                  setIsShowCommentModal={setIsShowCommentModal}
                  handleRemoveClick={handleRemoveClick}
                />
              )}
            {data.channel &&
              (data.channel.data.code === InteractionsChannel.incomingEmail ||
                data.channel.data.code ===
                  InteractionsChannel.outgoingEmail) &&
              interactionsEmailData && (
                <InteractionsEmail
                  interactionId={data.id}
                  interactionsEmailData={interactionsEmailData}
                  handleRemoveClick={handleRemoveClick}
                  channelCode={data.channel.data.code}
                  setIsShowEmailInModal={setIsShowEmailInModal}
                  setIsShowEmailOutModal={setIsShowEmailOutModal}
                />
              )}
            {data.channel &&
              (data.channel.data.code === InteractionsChannel.incomingCall ||
                data.channel.data.code ===
                  InteractionsChannel.outgoingCall) &&
              interactionsCallData && (
                <InteractionsCall
                  interactionsCallData={interactionsCallData}
                  handleRemoveClick={handleRemoveClick}
                  channelCode={data.channel.data.code}
                  setIsShowCallInModal={setIsShowCallInModal}
                  setIsShowCallOutModal={setIsShowCallOutModal}
                />
              )}
            {data.channel &&
              (data.channel.data.code === InteractionsChannel.incomingSms ||
                data.channel.data.code === InteractionsChannel.outgoingSms) &&
              interactionsSmsData && (
                <InteractionsSms
                  interactionsSmsData={interactionsSmsData}
                  handleRemoveClick={handleRemoveClick}
                  channelCode={data.channel.data.code}
                  setIsShowSmsInModal={setIsShowSmsInModal}
                  setIsShowSmsOutModal={setIsShowSmsOutModal}
                />
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default InteractionsDetails;
