import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";

interface EmailOutModalProps {
  /** Добавить */
  handleAddClick: (text: string) => void;
  /** Отменить */
  handleCancelClick: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно звонка */
export default function EmailOutModal({
  handleAddClick,
  handleCancelClick,
  interactionId,
  text,
  setText,
}: EmailOutModalProps) {
  // кому
  const [to, setTo] = useState<string>("");
  // от кого
  const [from, setFrom] = useState<string>("");

  const fields: FieldConfig[] = [
    {
      type: "input",
      label: "От кого",
      value: from,
      setValue: setFrom,
      style: { width: "232px" },
    },
    {
      type: "input",
      label: "Кому",
      value: to,
      setValue: setTo,
      style: { width: "232px" },
    },
    {
      type: "textarea",
      label: "Текст письма",
      value: text,
      setValue: setText,
      style: { height: "158px" },
    },
  ];

  return (
    <InteractionsModal
      title="Email исходящий"
      fields={fields}
      handleAddClick={handleAddClick}
      handleCancelClick={handleCancelClick}
      text={text}
    />
  );
}
