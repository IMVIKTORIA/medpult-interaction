import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";
import ModalInput from "../ModalInput/ModalInput";
import ModalTextarea from "../ModalTextarea/ModalTextarea";

interface CallOutModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
  maskFunction?: (value: string) => string;
}

/** Модальное окно звонка */
export default function CallOutModal({
  closeModal,
  interactionId,
  text,
  setText,
  maskFunction,
}: CallOutModalProps) {
  // кому
  const [to, setTo] = useState<string>("");
  // номер телефона
  const [number, setNumber] = useState<string>("");

  const fields: FieldConfig[] = [
    {
      type: FieldType.input,
      label: "Кому",
      value: to,
      setValue: setTo,
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

  /** Сохранить звонок исходящий */
  const saveCallHandler = async () => {
    const isIncoming = false;
    await Scripts.addCallInteraction(
      text,
      number,
      to,
      isIncoming,
      interactionId
    );
  };
      
  /** Поля ввода модалки */
  const ModalContent = (
    <>
      <ModalInput {...fields[0]}/>
      <ModalInput {...fields[1]}/>
      <ModalTextarea {...fields[2]}/>
    </>
  );

  return (
    <InteractionsModal
      title="Звонок исходящий"
      closeModal={closeModal}
      saveHandler={saveCallHandler}
    >
      {ModalContent}
    </InteractionsModal>
  );
}
