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
  fio: string;
  setFio: (value: string) => void;
  numberPhone: string;
  setNumberPhone: (value: string) => void;
  maskFunction?: (value: string) => string;
  /** Перезагрузить список */
  reloadData?: () => void;
}

/** Модальное окно звонка */
export default function SmsInModal({
  closeModal,
  interactionId,
  text,
  setText,
  fio,
  setFio,
  numberPhone,
  setNumberPhone,
  maskFunction,
  reloadData,
}: SmsInModalProps) {
  const fields: FieldConfig[] = [
    {
      type: FieldType.input,
      label: "От кого",
      value: fio,
      setValue: setFio,
      style: { width: "232px" },
    },
    {
      type: FieldType.input,
      label: "Номер телефона",
      value: numberPhone,
      setValue: setNumberPhone,
      style: { width: "232px" },
      placeholder: "+7 000 000 00 00",
      maskFunction: maskFunction,
    },
    {
      type: FieldType.textarea,
      label: "Текст сообщения",
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
      numberPhone,
      fio,
      isIncoming,
      interactionId
    );
    if (reloadData) reloadData();
  };

  return (
    <InteractionsModal
      title="СМС входящее"
      saveHandler={saveSmsHandler}
      closeModal={closeModal}
    >
      <ModalInput {...fields[0]} />
      <ModalInput {...fields[1]} />
      <ModalTextarea {...fields[2]} />
    </InteractionsModal>
  );
}
