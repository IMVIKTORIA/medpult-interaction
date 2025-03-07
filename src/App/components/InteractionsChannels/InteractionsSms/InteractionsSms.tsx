import React, { useEffect, useState } from "react";
import {
  InteractionsCallData,
  InteractionsChannel,
} from "../../../shared/types";
import icons from "../../../shared/icons";

class InteractionsSmsProps {
  /** Данные комментария */
  interactionsSmsData: InteractionsCallData;
  handleRemoveClick: () => Promise<void>;
  values: string;
  setIsShowSmsInModal: (value: boolean) => void;
  setIsShowSmsOutModal: (value: boolean) => void;
}

/** Проект комментария */
function InteractionsSms({
  interactionsSmsData,
  handleRemoveClick,
  values,
  setIsShowSmsInModal,
  setIsShowSmsOutModal,
}: InteractionsSmsProps) {
  const handleSwowClick = () => {
    if (values === InteractionsChannel.incomingSms) {
      setIsShowSmsInModal(true);
    } else setIsShowSmsOutModal(true);
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
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              кому:
              <span style={{ paddingLeft: "21px" }}>
                {interactionsSmsData?.fioWhom}
              </span>
            </div>
          </div>
          <div className="interactions-comment__button">
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
          </div>
        </div>
        <span style={{ paddingRight: "20px" }}>
          {interactionsSmsData?.comment}
        </span>
      </div>
    </div>
  );
}

export default InteractionsSms;
