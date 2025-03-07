import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";

interface EmailOutModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно звонка */
export default function EmailOutModal({
  closeModal,
  interactionId,
  text,
  setText,
}: EmailOutModalProps) {
  // кому
  const [to, setTo] = useState<string>("");
  // от кого
  const [from, setFrom] = useState<string>("");

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
      label: "Кому",
      value: to,
      setValue: setTo,
      style: { width: "232px" },
    },
    {
      type: "textarea",
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
  };

  return (
    <InteractionsModal
      title="Email исходящий"
      fields={fields}
      closeModal={closeModal}
      saveHandler={saveEmailHandler}
    />
  );
}
