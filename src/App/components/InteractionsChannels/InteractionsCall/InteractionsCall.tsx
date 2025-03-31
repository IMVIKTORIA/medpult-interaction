import React, { useEffect, useState } from "react";
import {
  InteractionsCallData,
  InteractionsChannel,
} from "../../../shared/types";
import icons from "../../../shared/icons";

class InteractionsCallProps {
  /** Данные комментария */
  interactionsCallData: InteractionsCallData;
  handleRemoveClick: () => Promise<void>;
  channelCode: string;
  setIsShowCallInModal: (value: boolean) => void;
  setIsShowCallOutModal: (value: boolean) => void;
  /** Показывать кнопки удалить и редактировать */
  isShowEditButtons: boolean;
  isUser?: boolean;
  showErrorMessage: (message: string) => void;
  isSystem: boolean;
}

/** Проект комментария */
function InteractionsCall({
  interactionsCallData,
  handleRemoveClick,
  channelCode,
  setIsShowCallInModal,
  setIsShowCallOutModal,
  isShowEditButtons,
  isUser,
  showErrorMessage,
  isSystem,
}: InteractionsCallProps) {
  const handleSwowClick = () => {
    if (!isShowEditButtons) {
      showErrorMessage("Изменение невозможно, прошло более 60 минут");
      return;
    }
    if (!isUser) {
      showErrorMessage(
        "Редактирование запрещено, взаимодействие внес другой пользователь"
      );
      return;
    }
    if (isSystem) {
      showErrorMessage(
        "Изменение невозможно, взаимодействие добавлено автоматически"
      );
      return;
    }
    if (channelCode === InteractionsChannel.incomingCall) {
      setIsShowCallInModal(true);
    } else setIsShowCallOutModal(true);
  };
  return (
    <div className="interactions-details_panel">
      <div className="interactions-details_panel__content">
        <div className="interactions-comment">
          <div className="interactions-comment__info">
            {interactionsCallData?.startDate}
            <div style={{ paddingTop: "10px" }}>
              от кого:
              <span className="interactions-comment__info__from">
                {interactionsCallData?.fioFrom}
                {channelCode === InteractionsChannel.outgoingCall && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {interactionsCallData?.departament}
                  </span>
                )}
                {channelCode === InteractionsChannel.incomingCall && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {interactionsCallData?.phone}
                  </span>
                )}
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              кому:
              <span style={{ paddingLeft: "21px" }}>
                {interactionsCallData?.fioWhom}
                {channelCode === InteractionsChannel.incomingCall && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {interactionsCallData?.departament}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="interactions-comment__button">
            <div
              style={{
                paddingRight: "15px",
                opacity: isShowEditButtons && isUser ? 1 : 0.5,
              }}
              onClick={handleSwowClick}
              title="Редактировать"
            >
              {icons.edit}
            </div>
            <div
              style={{ opacity: isShowEditButtons && isUser ? 1 : 0.5 }}
              onClick={handleRemoveClick}
              title="Удалить"
            >
              {icons.wasteBasket}
            </div>
          </div>
        </div>
        <span
          className="interactions-details_span"
          dangerouslySetInnerHTML={{ __html: interactionsCallData?.comment }}
        ></span>
      </div>
    </div>
  );
}

export default InteractionsCall;
