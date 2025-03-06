import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";

interface CallOutModalProps {
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
export default function CallOutModal({
  handleAddClick,
  handleCancelClick,
  interactionId,
  text,
  setText,
}: CallOutModalProps) {
  // кому
  const [to, setTo] = useState<string>("");
  // номер телефона
  const [number, setNumber] = useState<string>("");

  const fields: FieldConfig[] = [
    {
      type: "input",
      label: "Кому",
      value: to,
      setValue: setTo,
      style: { width: "232px" },
    },
    {
      type: "input",
      label: "Номер телефона",
      value: number,
      setValue: setNumber,
      style: { width: "232px" },
      placeholder: "+7 000 000 00 00",
    },
    {
      type: "textarea",
      label: "Комментарий",
      value: text,
      setValue: setText,
      style: { height: "158px" },
    },
  ];
  return (
    <InteractionsModal
      title="Звонок исходящий"
      fields={fields}
      handleAddClick={handleAddClick}
      handleCancelClick={handleCancelClick}
      text={text}
    />
  );
}
