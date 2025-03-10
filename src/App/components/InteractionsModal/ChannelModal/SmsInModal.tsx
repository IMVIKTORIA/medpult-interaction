import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";
import ModalInput from "../ModalInput/ModalInput";
import ModalTextarea from "../ModalTextarea/ModalTextarea";

interface SmsInModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
  maskFunction?: (value: string) => string;
}

/** Модальное окно звонка */
export default function SmsInModal({
  closeModal,
  interactionId,
  text,
  setText,
  maskFunction,
}: SmsInModalProps) {
  // от кого
  const [from, setFrom] = useState<string>("");
  // номер телефона
  const [number, setNumber] = useState<string>("");

  const fields: FieldConfig[] = [
    {
      type: FieldType.input,
      label: "От кого",
      value: from,
      setValue: setFrom,
      style: { width: "232px" },
    },
    {
      type: FieldType.input,
      label: "Номер телефона",
      value: number,
      setValue: setNumber,
      style: { width: "232px" },
      placeholder: "+7 000 000 00 00",
      maskFunction: maskFunction,
    },
    {
      type: FieldType.textarea,
      label: "Комментарий",
      value: text,
      setValue: setText,
      style: { height: "158px" },
    },
  ];

  /** Сохранить смс входящее */
  const saveSmsHandler = async () => {
    const isIncoming = true;
    await Scripts.addSmsInteraction(
      text,
      number,
      from,
      isIncoming,
      interactionId
    );
  };

  return (
    <InteractionsModal
      title="СМС входящее"
      saveHandler={saveSmsHandler}
      closeModal={closeModal}
    >
      <ModalInput {...fields[0]}/>
      <ModalInput {...fields[1]}/>
      <ModalTextarea {...fields[2]}/>
    </InteractionsModal>
  );
}
