import React, { useEffect, useState } from "react";
import moment from "moment";
import { IInteractionsCommentData } from "../../InteractionsDetailsTypes";
import icons from "../../../../../shared/icons";

interface IInteractionsCommentProps {
  /** Данные комментария */
  interactionsCommentData: IInteractionsCommentData;
  setIsShowCommentModal: (value: boolean) => void;
  handleRemoveClick: () => Promise<void>;
  /** Показывать кнопки удалить и редактировать */
  isShowEditButtons: boolean;
  
  /** Проверить можно ли изменять взаимодействие, и показать ошибку если нельзя */
  checkCanEdit: () => boolean;
}

/** Проект комментария */
function InteractionsComment({
  interactionsCommentData,
  setIsShowCommentModal,
  handleRemoveClick,
  isShowEditButtons,
  checkCanEdit
}: IInteractionsCommentProps) {
  const handleSwowClick = () => {
    const canEdit = checkCanEdit()
    if(!canEdit) return;

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
                opacity: isShowEditButtons ? 1 : 0.5,
              }}
              onClick={handleSwowClick}
              title="Редактировать"
            >
              {icons.editInteraction}
            </div>
            <div
              style={{
                opacity: isShowEditButtons ? 1 : 0.5,
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
