import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";

interface SmsInModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно звонка */
export default function SmsInModal({
  closeModal,
  interactionId,
  text,
  setText,
}: SmsInModalProps) {
  // от кого
  const [from, setFrom] = useState<string>("");
  // номер телефона
  const [number, setNumber] = useState<string>("");

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
    
  /** Сохранить смс входящее */
  const saveSmsHandler = async () => {
    const isIncoming = true;
    await Scripts.addSmsInteraction(text, number, from, isIncoming, interactionId);
  };

  return (
    <InteractionsModal
      title="СМС входящее"
      saveHandler={saveSmsHandler}
      fields={fields}
      closeModal={closeModal}
    />
  );
}
