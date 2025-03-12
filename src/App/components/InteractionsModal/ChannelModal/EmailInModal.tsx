import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";
import ModalInput from "../ModalInput/ModalInput";
import ModalTextarea from "../ModalTextarea/ModalTextarea";
import ModalLineSelect from "../ModalLineSelect/ModalLineSelect";

interface EmailInModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
  fio: string;
  setFio: (value: string) => void;
  logChan: string;
  setLogChan: (value: string) => void;
  /** Перезагрузить список */
  reloadData?: () => void;
  /** Идентификатор задачи (Для взаимодействий в задаче) */
  taskId?: string
}

/** Модальное окно звонка */
export default function EmailInModal({
  closeModal,
  interactionId,
  text,
  setText,
  fio,
  setFio,
  logChan,
  setLogChan,
  reloadData,
  taskId,
}: EmailInModalProps) {
  const fields: FieldConfig[] = [
    {
      type: FieldType.input,
      label: "Кому",
      value: logChan,
      setValue: setLogChan,
      style: { width: "232px" },
    },
    {
      type: FieldType.input,
      label: "От кого",
      value: fio,
      setValue: setFio,
      style: { width: "232px" },
    },
    {
      type: FieldType.textarea,
      label: "Текст письма",
      value: text,
      setValue: setText,
      style: { height: "158px" },
    },
  ];

  /** Сохранить email входящее */
  const saveEmailHandler = async () => {
    const isIncoming = true;
    await Scripts.addEmail(text, from, to, isIncoming, interactionId, taskId);
    if (reloadData) reloadData();
  };

  return (
    <InteractionsModal
      title="Email входящий"
      saveHandler={saveEmailHandler}
      closeModal={closeModal}
    >
      <ModalLineSelect {...fields[0]} />
      <ModalInput {...fields[1]} />
      <ModalTextarea {...fields[2]} />
    </InteractionsModal>
  );
}
