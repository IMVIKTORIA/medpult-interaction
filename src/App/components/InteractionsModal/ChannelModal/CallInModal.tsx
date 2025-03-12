import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";
import ModalInput from "../ModalInput/ModalInput";
import ModalTextarea from "../ModalTextarea/ModalTextarea";

interface CallInModalProps {
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
  /** Идентификатор задачи (Для взаимодействий в задаче) */
  taskId?: string
}

/** Модальное окно звонка */
export default function CallInModal({
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
  taskId,
}: CallInModalProps) {
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
      label: "Комментарий",
      value: text,
      setValue: setText,
      style: { height: "158px" },
    },
  ];

  /** Сохранить звонок входящий */
  const saveCallHandler = async () => {
    const isIncoming = true;
    await Scripts.addCallInteraction(
      text,
      numberPhone,
      fio,
      isIncoming,
      interactionId, 
      taskId
    );
    if (reloadData) reloadData();
  };

  return (
    <InteractionsModal
      title="Звонок входящий"
      closeModal={closeModal}
      saveHandler={saveCallHandler}
    >
      <ModalInput {...fields[0]} />
      <ModalInput {...fields[1]} />
      <ModalTextarea {...fields[2]} />
    </InteractionsModal>
  );
}
