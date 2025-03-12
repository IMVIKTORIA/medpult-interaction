import React, { useEffect, useState } from "react";
import {
  InteractionsCallData,
  InteractionsChannel,
} from "../../../shared/types";
import icons from "../../../shared/icons";
import Scripts from "../../../shared/utils/clientScripts";

class InteractionsSmsProps {
  /** id Взаимодействия */
  interactionId: string;
  /** Данные комментария */
  interactionsSmsData: InteractionsCallData;
  handleRemoveClick: () => Promise<void>;
  channelCode: string;
  setIsShowSmsInModal: (value: boolean) => void;
  setIsShowSmsOutModal: (value: boolean) => void;
  /** Показывать кнопки удалить и редактировать */
  isShowEditButtons: boolean;
}

/** Проект комментария */
function InteractionsSms({
  interactionId,
  interactionsSmsData,
  handleRemoveClick,
  channelCode,
  setIsShowSmsInModal,
  setIsShowSmsOutModal,
  isShowEditButtons,
}: InteractionsSmsProps) {
  const handleSwowClick = () => {
    if (channelCode === InteractionsChannel.incomingSms) {
      setIsShowSmsInModal(true);
    } else setIsShowSmsOutModal(true);
  };

  /** Обработка нажатия на кнопку ответить */
  const handleReplyClick = async() => {
    await Scripts.toggleSendSmsAnswer(interactionId)
  }

  return (
    <div className="interactions-details_panel">
      <div className="interactions-details_panel__content">
        <div className="interactions-comment">
          <div className="interactions-comment__info">
            {interactionsSmsData?.startDate}
            <div style={{ paddingTop: "10px" }}>
              от кого:
              <span className="interactions-comment__info__from">
                {interactionsSmsData?.fioFrom}
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              кому:
              <span style={{ paddingLeft: "21px" }}>
                {interactionsSmsData?.fioWhom}
              </span>
            </div>
          </div>
          <div className="interactions-email__button_wrapper">
            {
              (channelCode == InteractionsChannel.incomingSms) && 
              <div onClick={handleReplyClick} className="interactions-email__button">
                {icons.reply}ОТВЕТИТЬ
              </div>
            }
            {isShowEditButtons && (
              <>
                <div
                  className="interactions-email__button"
                  style={{ paddingRight: "15px" }}
                  onClick={handleSwowClick}
                  title="Редактировать"
                >
                  {icons.edit}
                </div>
                <div className="interactions-email__button" onClick={handleRemoveClick} title="Удалить">
                  {icons.wasteBasket}
                </div>
              </>
            )}
          </div>
        </div>
        <span className="interactions-details_span">
          {interactionsSmsData?.comment}
        </span>
      </div>
    </div>
  );
}

export default InteractionsSms;
