import React, { useEffect, useState } from "react";
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
}

/** Детальная форма согласования */
function InteractionsDetails(props: InteractionsDetailsProps) {
  const {
    data,
    values,
    setValue,
    setValues,
    columnsSettings,
    onClickRowHandler,
    setSelectedForma,
    onRowClick,
    modalStates,
    reloadData,
  } = props;

  const {
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
  } = modalStates;

  // Флаг загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Данные
  const [labels, setLabels] = useState({});
  // Данные комментария
  const [interactionsCommentData, setInteractionsCommentData] =
    useState<InteractionsCommentData>();
  // Получить данные комментария
  const fetchInteractionsComment = async () => {
    const commentData = await Scripts.getInteractionsComment(data.id);
    setInteractionsCommentData(commentData);
  };
  // Данные  письма
  const [interactionsEmailData, setInteractionsEmailData] =
    useState<InteractionsEmailData>();
  // Получить данные письма
  const fetchInteractionsEmail = async () => {
    const emailData = await Scripts.getInteractionsEmail(data.id);
    setInteractionsEmailData(emailData);
  };
  // Данные звонка
  const [interactionsCallData, setinteractionsCallData] =
    useState<InteractionsCallData>();
  // Получить данные звока
  const fetchInteractionsCall = async () => {
    const callData = await Scripts.getInteractionsCall(data.id);
    setinteractionsCallData(callData);
  };
  // Данные смс
  const [interactionsSmsData, setinteractionsSmsData] =
    useState<InteractionsCallData>();
  // Получить данные смс
  const fetchInteractionsSms = async () => {
    const smsData = await Scripts.getInteractionsSms(data.id);
    setinteractionsSmsData(smsData);
  };

  // Перезагрузить данные формы
  const reloadFulldata = () => {
    setIsLoading(true);
    // Получить полные данные по data.id
    Scripts.getInteractionsFulldata(data.id).then((fullData) => {
      setIsLoading(false);
      // Присвоить полные данные в состояние
      setValues(fullData);
    });

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
    await Scripts.removeCommentChannel(data.id);
    reloadData();
  };

  const handleAddClick = (text: string) => {
    setIsShowCommentModal(false);
    setIsShowCallInModal(false);
    setIsShowCallOutModal(false);
    setIsShowSmsInModal(false);
    setIsShowSmsOutModal(false);
    setIsShowEmailInModal(false);
    setIsShowEmailOutModal(false);
  };
  const handleCancelClick = () => {
    setIsShowCommentModal(false);
    setIsShowCallInModal(false);
    setIsShowCallOutModal(false);
    setIsShowSmsInModal(false);
    setIsShowSmsOutModal(false);
    setIsShowEmailInModal(false);
    setIsShowEmailOutModal(false);
  };

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
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            interactionId={data.id}
            initialText={data.comment.value}
          />
          {/* Шапка */}
          <CustomListRow
            data={data as any}
            columnsSettings={columnsSettings}
            // isShowDetails={false}
            setOpenRowIndex={onClickRowHandler}
            reloadData={function () {}}
            isOpen
            isClickable
          />
          <div className="interactions-details__content">
            {values.channel &&
              values.channel.data.code === InteractionsChannel.comment &&
              interactionsCommentData && (
                <InteractionsComment
                  interactionsCommentData={interactionsCommentData}
                  setIsShowCommentModal={setIsShowCommentModal}
                  handleRemoveClick={handleRemoveClick}
                />
              )}
            {values.channel &&
              (values.channel.data.code === InteractionsChannel.incomingEmail ||
                values.channel.data.code ===
                  InteractionsChannel.outgoingEmail) &&
              interactionsEmailData && (
                <InteractionsEmail
                  interactionsEmailData={interactionsEmailData}
                  handleRemoveClick={handleRemoveClick}
                  values={values.channel.data.code}
                  setIsShowEmailInModal={setIsShowEmailInModal}
                  setIsShowEmailOutModal={setIsShowEmailOutModal}
                />
              )}
            {values.channel &&
              (values.channel.data.code === InteractionsChannel.incomingCall ||
                values.channel.data.code ===
                  InteractionsChannel.outgoingCall) &&
              interactionsCallData && (
                <InteractionsCall
                  interactionsCallData={interactionsCallData}
                  handleRemoveClick={handleRemoveClick}
                  values={values.channel.data.code}
                  setIsShowCallInModal={setIsShowCallInModal}
                  setIsShowCallOutModal={setIsShowCallOutModal}
                />
              )}
            {values.channel &&
              (values.channel.data.code === InteractionsChannel.incomingSms ||
                values.channel.data.code === InteractionsChannel.outgoingSms) &&
              interactionsSmsData && (
                <InteractionsSms
                  interactionsSmsData={interactionsSmsData}
                  handleRemoveClick={handleRemoveClick}
                  values={values.channel.data.code}
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
