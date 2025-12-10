import React, { useEffect, useState } from "react";
import { InteractionsChannel } from "../../../../../shared/types";
import { IInteractionsCallData } from "../../InteractionsDetailsTypes";
import icons from "../../../../../shared/icons";

interface IInteractionsCallProps {
  /** Данные комментария */
  interactionsCallData: IInteractionsCallData;
  handleRemoveClick: () => Promise<void>;
  channelCode: string;
  setIsShowCallInModal: (value: boolean) => void;
  setIsShowCallOutModal: (value: boolean) => void;
  /** Показывать кнопки удалить и редактировать */
  isShowEditButtons: boolean;
  /** Проверить можно ли изменять взаимодействие, и показать ошибку если нельзя */
  checkCanEdit: () => boolean;
}

function InteractionsCall({
  interactionsCallData,
  handleRemoveClick,
  channelCode,
  setIsShowCallInModal,
  setIsShowCallOutModal,
  isShowEditButtons,
  checkCanEdit,
}: IInteractionsCallProps) {
  const handleSwowClick = () => {
    if (!checkCanEdit()) return;
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
                {/* {channelCode === InteractionsChannel.incomingCall && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {applyPhoneMask(interactionsCallData?.phone ?? "")}
                  </span>
                )} */}
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
                {/* {channelCode === InteractionsChannel.outgoingCall && (
                  <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                    {applyPhoneMask(interactionsCallData?.phone ?? "")}
                  </span>
                )} */}
              </span>
            </div>
          </div>
          <div className="interactions-comment__button">
            <div
              style={{
                paddingRight: "15px",
                opacity: isShowEditButtons ? 1 : 0.5,
              }}
              onClick={handleSwowClick}
              title="Редактировать"
            >
              {icons.editInteraction}
            </div>
            <div
              style={{ opacity: isShowEditButtons ? 1 : 0.5 }}
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
