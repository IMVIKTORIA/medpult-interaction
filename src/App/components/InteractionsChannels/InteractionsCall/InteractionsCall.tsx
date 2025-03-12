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
  isSystem,
}: InteractionsCallProps) {
  const handleSwowClick = () => {
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
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              кому:
              <span style={{ paddingLeft: "21px" }}>
                {interactionsCallData?.fioWhom}
              </span>
            </div>
          </div>
          <div className="interactions-comment__button">
            {isShowEditButtons && !isSystem && (
              <>
                <div
                  style={{ paddingRight: "15px" }}
                  onClick={handleSwowClick}
                  title="Редактировать"
                >
                  {icons.edit}
                </div>
                <div onClick={handleRemoveClick} title="Удалить">
                  {icons.wasteBasket}
                </div>
              </>
            )}
          </div>
        </div>
        <span className="interactions-details_span">
          {interactionsCallData?.comment}
        </span>
      </div>
    </div>
  );
}

export default InteractionsCall;
