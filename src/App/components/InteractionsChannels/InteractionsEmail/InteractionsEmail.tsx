import React, { useEffect, useState } from "react";
import {
  InteractionsEmailData,
  InteractionsChannel,
} from "../../../shared/types";
import icons from "../../../shared/icons";
import Scripts from "../../../shared/utils/clientScripts";

class InteractionsEmailProps {
  /** id Взаимодействия */
  interactionId: string;
  /** Данные проекта письма */
  interactionsEmailData: InteractionsEmailData;
  handleRemoveClick: () => Promise<void>;
  /** Код канала */
  channelCode: string;
  setIsShowEmailInModal: (value: boolean) => void;
  setIsShowEmailOutModal: (value: boolean) => void;
  /** Показывать кнопки удалить и редактировать */
  isShowEditButtons: boolean;
  /** Показывать кнопки переслать и ответить */
  isSystem: boolean;
  /** Идентификатор задачи */
  taskId?: string;

  /** Проверить можно ли изменять взаимодействие, и показать ошибку если нельзя */
  checkCanEdit: () => boolean;
}

/** Проект письма */
function InteractionsEmail({
  interactionId,
  interactionsEmailData,
  handleRemoveClick,
  channelCode,
  setIsShowEmailInModal,
  setIsShowEmailOutModal,
  isShowEditButtons,
  isSystem,
  taskId,
  checkCanEdit,
}: InteractionsEmailProps) {
  const handleSwowClick = () => {
    if (!checkCanEdit()) return;

    if (channelCode === InteractionsChannel.incomingEmail) {
      setIsShowEmailInModal(true);
    } else setIsShowEmailOutModal(true);
  };

  /** Обработка нажатия на кнопку ответить */
  const handleReplyClick = async () => {
    await Scripts.toggleSendEmailAnswer(interactionId, taskId);
  };

  /** Обработка нажатия на кнопку переслать */
  const handleForwardClick = async () => {
    await Scripts.toggleSendEmailForward(interactionId, taskId);
  };

  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});
  // Очищаем Blob URL при размонтировании компонента
  useEffect(() => {
    return () => {
      Object.values(blobUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [blobUrls]);

  /**Создаем и сохраняем Blob URL из Data URL */
  const getBlobUrl = (dataUrl: string): string | null => {
    try {
      // Если уже есть Blob URL для этого Data URL, возвращаем его
      if (blobUrls[dataUrl]) {
        return blobUrls[dataUrl];
      }
      const [header, data] = dataUrl.split(",");
      const mimeType = header.split(":")[1].split(";")[0];
      const byteString = atob(data);
      const byteNumbers = new Array(byteString.length);

      for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);

      // Сохраняем Blob URL в состоянии
      setBlobUrls((prev) => ({ ...prev, [dataUrl]: blobUrl }));

      return blobUrl;
    } catch (error) {
      console.error("Error creating blob URL:", error);
      return null;
    }
  };

  /**Рендерим вложение в зависимости от типа */
  const renderAttachment = (file: string, index: number) => {
    try {
      const mimeType = file.split(":")[1]?.split(";")[0];
      const fileExtension = mimeType?.split("/")[1] || "file";
      const fileName = `Документ${index + 1}`;

      // Для PDF и изображений (PNG, JPEG и тд) — показываем только ссылку
      if (mimeType === "application/pdf" || mimeType?.startsWith("image/")) {
        const blobUrl = getBlobUrl(file);
        if (!blobUrl) return null;

        const icon = mimeType.startsWith("image/") ? "" : icons.pdf;

        return (
          <span
            key={index}
            style={{ display: "flex", alignItems: "center", margin: "5px 0" }}
          >
            {icon}
            <a
              href={blobUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "5px" }}
            >
              {fileName}.{fileExtension}
            </a>
          </span>
        );
      }

      // Для остальных типов
      const blobUrl = getBlobUrl(file);
      if (!blobUrl) return null;

      return (
        <span
          key={index}
          style={{ display: "flex", alignItems: "center", margin: "5px 0" }}
        >
          <a
            href={blobUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={`${fileName}.${fileExtension}`}
            style={{ marginLeft: "5px" }}
          >
            {fileName} ({mimeType})
          </a>
        </span>
      );
    } catch (error) {
      console.error("Error rendering:", error);
      return null;
    }
  };

  return (
    <div className="interactions-details_panel">
      <div className="interactions-details_panel__content">
        <div className="interactions-email">
          <div className="interactions-email__info">
            {interactionsEmailData?.startDate}
            <div style={{ paddingTop: "10px" }}>
              от кого:
              <span className="interactions-email__info__from">
                {interactionsEmailData?.fioFrom}
                <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                  {interactionsEmailData?.email}
                </span>
                {channelCode === InteractionsChannel.outgoingEmail && (
                  <>
                    <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                      {interactionsEmailData?.createdBy}
                    </span>
                    <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                      {interactionsEmailData?.departament}
                    </span>
                  </>
                )}
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              кому:
              <span style={{ paddingLeft: "21px" }}>
                {interactionsEmailData?.fioWhom}
                {channelCode === InteractionsChannel.incomingEmail && (
                  <>
                    <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                      {interactionsEmailData?.createdBy}
                    </span>
                    <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                      {interactionsEmailData?.departament}
                    </span>
                  </>
                )}

                <span style={{ fontWeight: "400", paddingLeft: "10px" }}>
                  {interactionsEmailData?.email}
                </span>
              </span>
            </div>
            <div style={{ paddingTop: "10px" }}>
              копия:
              <span style={{ paddingLeft: "16px" }}>
                {interactionsEmailData?.copy}
              </span>
            </div>
            <div className="interactions-email__info__topic">
              тема:
              <span style={{ paddingLeft: "5px" }}>
                {interactionsEmailData?.topic}
              </span>
            </div>
            <div className="interactions-email__info__file">
              {interactionsEmailData?.fileSrc
                ?.filter((file) => file.trim() !== "")
                .map((file, index) => renderAttachment(file, index))}
            </div>
          </div>
          <div className="interactions-email__button_wrapper">
            {isSystem && (
              <>
                {channelCode === InteractionsChannel.incomingEmail && (
                  <div
                    onClick={handleReplyClick}
                    className="interactions-email__button"
                  >
                    {icons.reply}ОТВЕТИТЬ
                  </div>
                )}
                <div
                  onClick={handleForwardClick}
                  className="interactions-email__button"
                >
                  {icons.forward}ПЕРЕСЛАТЬ
                </div>
              </>
            )}

            <div
              style={{ opacity: isShowEditButtons ? 1 : 0.5 }}
              onClick={handleSwowClick}
              title="Редактировать"
              className="interactions-email__button"
            >
              {icons.edit}
            </div>
            <div
              style={{ opacity: isShowEditButtons ? 1 : 0.5 }}
              onClick={handleRemoveClick}
              title="Удалить"
              className="interactions-email__button"
            >
              {icons.wasteBasket}
            </div>
          </div>
        </div>
        <span
          className="interactions-details_span"
          dangerouslySetInnerHTML={{ __html: interactionsEmailData?.text }}
        ></span>
      </div>
    </div>
  );
}

export default InteractionsEmail;
