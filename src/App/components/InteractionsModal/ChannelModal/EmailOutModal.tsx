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
  setText: (value: string) => void;
  /** Перезагрузить список */
  reloadData?: () => void;
}

/** Модальное окно звонка */
export default function EmailOutModal({
  closeModal,
  interactionId,
  text,
  setText,
  reloadData,
}: EmailOutModalProps) {
  // кому
  const [to, setTo] = useState<string>("");
  // от кого
  const [from, setFrom] = useState<string>("");

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
      label: "Кому",
      value: to,
      setValue: setTo,
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
    await Scripts.addEmail(text, from, to, isIncoming, interactionId);
    if (reloadData) reloadData();
  };

  return (
    <InteractionsModal
      title="Email исходящий"
      closeModal={closeModal}
      saveHandler={saveEmailHandler}
    >
      <ModalInput {...fields[0]} />
      <ModalLineSelect {...fields[1]} />
      <ModalTextarea {...fields[2]} />
    </InteractionsModal>
  );
}
