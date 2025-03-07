import React, { useEffect, useState } from "react";
import {
  InteractionsEmailData,
  InteractionsChannel,
} from "../../../shared/types";
import icons from "../../../shared/icons";
import Scripts from "../../../shared/utils/clientScripts";

class InteractionsEmailProps {
  /** id Взаимодействия */
  interactionId: string;
  /** Данные проекта письма */
  interactionsEmailData: InteractionsEmailData;
  handleRemoveClick: () => Promise<void>;
  /** Код канала */
  channelCode: string;
  setIsShowEmailInModal: (value: boolean) => void;
  setIsShowEmailOutModal: (value: boolean) => void;
}

/** Проект письма */
function InteractionsEmail({
  interactionId,
  interactionsEmailData,
  handleRemoveClick,
  channelCode,
  setIsShowEmailInModal,
  setIsShowEmailOutModal,
}: InteractionsEmailProps) {
  const handleSwowClick = () => {
    if (channelCode === InteractionsChannel.incomingEmail) {
      setIsShowEmailInModal(true);
    } else setIsShowEmailOutModal(true);
  };

  /** Обработка нажатия на кнопку ответить */
  const handleReplyClick = async() => {
    await Scripts.toggleSendEmailAnswer(interactionId)
  }
  
  /** Обработка нажатия на кнопку переслать */
  const handleForwardClick = async() => {
    await Scripts.toggleSendEmailForward(interactionId)
  }

  return (
    <div className="interactions-details_panel">
      <div className="interactions-details_panel__content">
        <div className="interactions-email">
          <div className="interactions-email__info">
            {interactionsEmailData?.startDate}
            <div style={{ paddingTop: "10px" }}>
              от кого:
              <span className="interactions-email__info__from">
                {interactionsEmailData?.fioFrom}
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              кому:
              <span style={{ paddingLeft: "21px" }}>
                {interactionsEmailData?.fioWhom}
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              копия:
              <span style={{ paddingLeft: "16px" }}>
                {interactionsEmailData?.copy}
              </span>
            </div>
            <div className="interactions-email__info__topic">
              тема:
              <span style={{ paddingLeft: "5px" }}>
                {interactionsEmailData?.topic}
              </span>
            </div>
            <div className="interactions-email__info__file">
              {/* {icons.pdf} */}
              <span>{interactionsEmailData?.fileSrc}</span>
            </div>
          </div>

          <div className="interactions-email__button_wrapper">
            <div onClick={handleReplyClick} className="interactions-email__button">
              {icons.reply}ОТВЕТИТЬ
            </div>
            <div onClick={handleForwardClick} className="interactions-email__button">
              {icons.forward}ПЕРЕСЛАТЬ
            </div>
            <div onClick={handleSwowClick} title="Редактировать" className="interactions-email__button">
              {icons.edit}
            </div>
            <div onClick={handleRemoveClick} title="Удалить" className="interactions-email__button">
              {icons.wasteBasket}
            </div>
          </div>
        </div>
        <span style={{ paddingRight: "20px" }}>
          {interactionsEmailData?.text}
        </span>
      </div>
    </div>
  );
}

export default InteractionsEmail;
