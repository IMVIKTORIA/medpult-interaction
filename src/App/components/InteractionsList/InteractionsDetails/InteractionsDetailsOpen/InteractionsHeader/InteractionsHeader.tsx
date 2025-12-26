import React, { useEffect, useState } from "react";
import CustomButton from "../../../../CustomButton/CustomButton";
import icons from "../../../../../shared/icons";
import {
  IInteractionDetailsData,
  InteractionsStatus,
} from "../../../../../shared/types";
import Scripts from "../../../../../shared/utils/clientScripts";

/** Пропсы */
interface InteractionsHeaderProps {
  data: IInteractionDetailsData;
  onSave?: () => void;
  reloadData?: () => void;
  duplicateCount?: number;
}

function InteractionsHeader(props: InteractionsHeaderProps) {
  const { data, onSave, reloadData, duplicateCount } = props;

  /** Копирование номера в буфер обмена */
  const handleCopyClick = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(data.number);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = data.number;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  /** Обработка нажатия на кнопку изменить */
  const onEditClick = async () => {
    const email = data.email;
    const link = Scripts.getIcomingEmailLink();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (email) redirectUrl.searchParams.set("email", email);
    if (data.id) redirectUrl.searchParams.set("interactionId", data.id);
    window.open(redirectUrl.toString(), "_blank");
  };
  /** Обработка нажатия на кнопку Сохранить */
  const onTakeSaveClick = async () => {
    onSave?.();
    reloadData?.();
  };

  /** Обработка нажатия на кнопку В работу */
  const onTakeToWorkClick = async () => {
    await Scripts.setStatusAtWork(data.id);
    onSave?.();
    reloadData?.();
  };
  /** Обработка нажатия на кнопку Закрыть */
  const onTakeCloseClick = async () => {
    await Scripts.setStatusProcessed(data.id);
    onSave?.();
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
              title={data.duplicateEmails.join(", ")}
            >
              {duplicateCount}
            </span>
          )}
        </div>
        <div className="interactions-open-panel-header__content_number">
          {data.number}
          <span
            onClick={handleCopyClick}
            style={{ cursor: "pointer" }}
            title="Скопировать"
          >
            {icons.Copy}
          </span>
        </div>
      </div>
      {data.isIncoming && (
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

          <CustomButton
            title={`Сохранить${duplicateCount ? ` (${duplicateCount})` : ""}`}
            clickHandler={onTakeSaveClick}
            svg={icons.saveIcon}
            svgPosition="left"
            disabled={data.status.code === InteractionsStatus.processed}
          />
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
      )}
    </div>
  );
}

export default InteractionsHeader;
