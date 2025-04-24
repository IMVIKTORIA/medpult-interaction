import React, { useEffect, useState } from "react";
import {
  InteractionsCallData,
  InteractionsChannel,
} from "../../../shared/types";
import icons from "../../../shared/icons";
import Scripts from "../../../shared/utils/clientScripts";
import moment from "moment";

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
  
  /** Проверить можно ли изменять взаимодействие, и показать ошибку если нельзя */
  checkCanEdit: () => boolean;
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
  checkCanEdit
}: InteractionsSmsProps) {
  const handleSwowClick = () => {
    if(!checkCanEdit()) return
    if (channelCode === InteractionsChannel.incomingSms) {
      setIsShowSmsInModal(true);
    } else setIsShowSmsOutModal(true);
  };

  /** Обработка нажатия на кнопку ответить */
  const handleReplyClick = async () => {
    await Scripts.toggleSendSmsAnswer(interactionId);
  };

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
                {channelCode === InteractionsChannel.incomingSms && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {interactionsSmsData?.phone}
                  </span>
                )}
                {channelCode === InteractionsChannel.outgoingSms && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {interactionsSmsData?.departament}
                  </span>
                )}
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              кому:
              <span style={{ paddingLeft: "21px" }}>
                {interactionsSmsData?.fioWhom}
                {channelCode === InteractionsChannel.outgoingSms && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {interactionsSmsData?.phone}
                  </span>
                )}
                {channelCode === InteractionsChannel.incomingSms && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {interactionsSmsData?.departament}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="interactions-email__button_wrapper">
            {channelCode == InteractionsChannel.incomingSms && (
              <div
                onClick={handleReplyClick}
                className="interactions-email__button"
              >
                {icons.reply}ОТВЕТИТЬ
              </div>
            )}
            <div
              className="interactions-email__button"
              style={{
                opacity: isShowEditButtons ? 1 : 0.5,
              }}
              onClick={handleSwowClick}
              title="Редактировать"
            >
              {icons.edit}
            </div>
            <div
              style={{ opacity: isShowEditButtons ? 1 : 0.5 }}
              className="interactions-email__button"
              onClick={handleRemoveClick}
              title="Удалить"
            >
              {icons.wasteBasket}
            </div>
          </div>
        </div>
        <span
          className="interactions-details_span"
          dangerouslySetInnerHTML={{ __html: interactionsSmsData?.comment }}
        ></span>
      </div>
    </div>
  );
}

export default InteractionsSms;
