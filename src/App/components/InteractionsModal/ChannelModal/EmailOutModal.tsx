import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";
import ModalInput from "../ModalInput/ModalInput";
import ModalTextarea from "../ModalTextarea/ModalTextarea";
import ModalLineSelect from "../ModalLineSelect/ModalLineSelect";

interface EmailOutModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  fio: string;
  setFio: (value: string) => void;
  logChan: string;
  setLogChan: (value: string) => void;
  setText: (value: string) => void;
  /** Перезагрузить список */
  reloadData?: () => void;
  /** Идентификатор задачи (Для взаимодействий в задаче) */
  taskId?: string
}

/** Модальное окно звонка */
export default function EmailOutModal({
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
}: EmailOutModalProps) {
  const fields: FieldConfig[] = [
    {
      type: FieldType.input,
      label: "От кого",
      value: logChan,
      setValue: setLogChan,
      style: { width: "232px" },
    },
    {
      type: FieldType.input,
      label: "Кому",
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

  /** Сохранить email исходящее */
  const saveEmailHandler = async () => {
    const isIncoming = false;
    await Scripts.addEmail(text, logChan, fio, isIncoming, interactionId, taskId);
    if (reloadData) reloadData();
  };

  return (
    <InteractionsModal
      title="Email исходящий"
      closeModal={closeModal}
      saveHandler={saveEmailHandler}
    >
      <ModalLineSelect {...fields[0]} />
      <ModalInput {...fields[1]} />
      <ModalTextarea {...fields[2]} />
    </InteractionsModal>
  );
}
