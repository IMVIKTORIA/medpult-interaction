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
  values: string;
  setIsShowCallInModal: (value: boolean) => void;
  setIsShowCallOutModal: (value: boolean) => void;
}

/** Проект комментария */
function InteractionsCall({
  interactionsCallData,
  handleRemoveClick,
  values,
  setIsShowCallInModal,
  setIsShowCallOutModal,
}: InteractionsCallProps) {
  const handleSwowClick = () => {
    if (values === InteractionsChannel.incomingCall) {
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
            <div style={{ paddingRight: "15px" }} onClick={handleSwowClick}>
              {icons.edit}
            </div>
            <div onClick={handleRemoveClick}>{icons.wasteBasket}</div>
          </div>
        </div>
        <span style={{ paddingRight: "20px" }}>
          {interactionsCallData?.comment}
        </span>
      </div>
    </div>
  );
}

export default InteractionsCall;
