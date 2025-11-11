import React, { useEffect, useState } from "react";
import CustomButton from "../../../../CustomButton/CustomButton";
import icons from "../../../../../shared/icons";
import {
  InteractionDetailsData,
  InteractionsStatus,
} from "../../../../../shared/types";
import Scripts from "../../../../../shared/utils/clientScripts";

/** Пропсы */
interface InteractionsHeaderProps {
  data: InteractionDetailsData;
  onSave?: () => void;
  reloadData?: () => void;
  duplicateCount?: number;
}

function InteractionsHeader(props: InteractionsHeaderProps) {
  const { data, onSave, reloadData, duplicateCount } = props;

  /** Копирование номера в буфер обмена */
  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(data.number);
  };
  /** Обработка нажатия на кнопку изменить */
  const onEditClick = async () => {
    const email = data.email;
    const link = Scripts.getIcomingEmailLink();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (email) redirectUrl.searchParams.set("email", email);
    window.open(redirectUrl.toString(), "_blank");
  };
  /** Обработка нажатия на кнопку В работу */
  const onTakeToWorkClick = async () => {
    await Scripts.setStatusAtWork(data.id);
    reloadData?.();
  };
  /** Обработка нажатия на кнопку Закрыть */
  const onTakeCloseClick = async () => {
    await Scripts.setStatusProcessed(data.id);
    reloadData?.();
  };
  return (
    <div className="interactions-open-panel-header">
      <div className="interactions-open-panel-header__content">
        <div className="interactions-open-panel-header__content_dublicate">
          <div className="interactions-open-panel-header__content_title">
            Взаимодействие
          </div>
          {duplicateCount && (
            <span
              className="interactions-open-panel-header__content_count"
              title={
                Array.isArray(data.fioWhom)
                  ? data.fioWhom.join(", ")
                  : data.fioWhom
              }
            >
              {duplicateCount}
            </span>
          )}
        </div>
        <div className="interactions-open-panel-header__content_number">
          {data.number}
          <span onClick={handleCopyClick} style={{ cursor: "pointer" }}>
            {icons.Copy}
          </span>
        </div>
      </div>
      <div className="interactions-open-panel-header__button">
        {data.request?.code != "" ? (
          <CustomButton
            title={`Изменить${duplicateCount ? ` (${duplicateCount})` : ""}`}
            clickHandler={onEditClick}
            svg={icons.Edit}
            svgPosition="left"
            disabled={data.status.code === InteractionsStatus.processed}
          />
        ) : (
          <CustomButton
            title={`Привязать${duplicateCount ? ` (${duplicateCount})` : ""}`}
            clickHandler={onEditClick}
            svg={icons.Bind}
            svgPosition="left"
            style={{
              backgroundColor: "#21A038",
              color: "#FDFDFD",
              border: "none",
            }}
            disabled={data.status.code === InteractionsStatus.processed}
          />
        )}
        {data.status.code === InteractionsStatus.atWork && (
          <CustomButton
            buttonType="outline"
            title={`Закрыть${duplicateCount ? ` (${duplicateCount})` : ""}`}
            clickHandler={onTakeCloseClick}
            svg={icons.Check}
            svgPosition="left"
          />
        )}
        {(data.status.code === InteractionsStatus.new ||
          data.status.code === InteractionsStatus.queue) && (
          <CustomButton
            title={`В работу${duplicateCount ? ` (${duplicateCount})` : ""}`}
            buttonType="outline"
            clickHandler={onTakeToWorkClick}
            svg={icons.Next}
            svgPosition="left"
          />
        )}
      </div>
    </div>
  );
}

export default InteractionsHeader;
