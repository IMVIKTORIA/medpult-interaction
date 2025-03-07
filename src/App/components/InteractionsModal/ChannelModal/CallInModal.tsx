import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";

interface CallInModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно звонка */
export default function CallInModal({
  closeModal,
  interactionId,
  text,
  setText,
}: CallInModalProps) {
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
        
  /** Сохранить звонок входящий */
  const saveCallHandler = async () => {
    const isIncoming = true;
    await Scripts.addCallInteraction(text, number, from, isIncoming, interactionId);
  };

  return (
    <InteractionsModal
      title="Звонок входящий"
      fields={fields}
      closeModal={closeModal}
      saveHandler={saveCallHandler}
    />
  );
}
