import React, { useEffect, useState } from "react";
import { InteractionsCommentData } from "../../../shared/types";
import icons from "../../../shared/icons";

class InteractionsCommentProps {
  /** Данные комментария */
  interactionsCommentData: InteractionsCommentData;
  setIsShowCommentModal: (value: boolean) => void;
  handleRemoveClick: () => Promise<void>;
  /** Показывать кнопки удалить и редактировать */
  isShowEditButtons: boolean;
  /** Показывать кнопки переслать и ответить */
  isUser?: boolean;
  showErrorMessage: (message: string) => void;
}

/** Проект комментария */
function InteractionsComment({
  interactionsCommentData,
  setIsShowCommentModal,
  handleRemoveClick,
  isShowEditButtons,
  isUser,
  showErrorMessage,
}: InteractionsCommentProps) {
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
    setIsShowCommentModal(true);
  };

  return (
    <div className="interactions-details_panel">
      <div className="interactions-details_panel__content">
        <div className="interactions-comment">
          <div className="interactions-comment__info">
            {interactionsCommentData?.startDate}
            <div style={{ paddingTop: "10px" }}>
              от кого:
              <span className="interactions-comment__info__from">
                {interactionsCommentData?.fio}
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
              style={{
                opacity: isShowEditButtons && isUser ? 1 : 0.5,
              }}
              onClick={handleRemoveClick}
              title="Удалить"
            >
              {icons.wasteBasket}
            </div>
          </div>
        </div>
        <span
          className="interactions-details_span"
          dangerouslySetInnerHTML={{ __html: interactionsCommentData?.comment }}
        ></span>
      </div>
    </div>
  );
}

export default InteractionsComment;
