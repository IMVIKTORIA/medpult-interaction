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
  /** Перезагрузить список */
  reloadData?: () => void;
}

/** Модальное окно звонка */
export default function EmailInModal({
  closeModal,
  interactionId,
  text,
  setText,
  reloadData,
}: EmailInModalProps) {
  // от кого
  const [from, setFrom] = useState<string>("");
  // кому
  const [to, setTo] = useState<string>("");

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
      label: "От кого",
      value: from,
      setValue: setFrom,
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
    await Scripts.addEmail(text, from, to, isIncoming, interactionId);
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
