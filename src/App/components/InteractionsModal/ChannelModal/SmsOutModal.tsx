import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";

interface SmsOutModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно звонка */
export default function SmsOutModal({
  closeModal,
  interactionId,
  text,
  setText,
}: SmsOutModalProps) {
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
  
  /** Сохранить смс исходящее */
  const saveSmsHandler = async () => {
    const isIncoming = false;
    await Scripts.addSmsInteraction(text, number, to, isIncoming, interactionId);
  };

  return (
    <InteractionsModal
      title="СМС исходящее"
      saveHandler={saveSmsHandler}
      fields={fields}
      closeModal={closeModal}
    />
  );
}
