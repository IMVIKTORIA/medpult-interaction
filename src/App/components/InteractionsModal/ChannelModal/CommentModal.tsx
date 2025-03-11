import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";
import ModalTextarea from "../ModalTextarea/ModalTextarea";

interface CommentModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  taskId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно комментария */
export default function CommentModal({
  closeModal,
  interactionId,
  taskId,
  text,
  setText,
}: CommentModalProps) {
  // Текст

  const fields: FieldConfig[] = [
    {
      type: FieldType.textarea,
      label: "Комментарий",
      value: text,
      setValue: setText,
      style: { height: "270px" },
    },
  ];

  const saveCommentHandler = async () => {
    await Scripts.addCommentChannelTask(interactionId, taskId, text);
  };

  return (
    <InteractionsModal
      title="Комментарий"
      saveHandler={saveCommentHandler}
      closeModal={closeModal}
    >
      <ModalTextarea {...fields[0]} />
    </InteractionsModal>
  );
}
