import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";

interface CommentModalProps {
  /** Добавить */
  handleAddClick: (text: string) => void;
  /** Отменить */
  handleCancelClick: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно комментария */
export default function CommentModal({
  handleAddClick,
  handleCancelClick,
  interactionId,
  text,
  setText,
}: CommentModalProps) {
  // Текст

  const fields: FieldConfig[] = [
    {
      type: "textarea",
      label: "Комментарий",
      value: text,
      setValue: setText,
      style: { height: "270px" },
    },
  ];

  const saveCommentHandler = async (text: string) => {
    await Scripts.addCommentChannel(interactionId, text);
  };

  return (
    <InteractionsModal
      title="Комментарий"
      fields={fields}
      saveHandler={saveCommentHandler}
      handleAddClick={handleAddClick}
      handleCancelClick={handleCancelClick}
      text={text}
    />
  );
}
