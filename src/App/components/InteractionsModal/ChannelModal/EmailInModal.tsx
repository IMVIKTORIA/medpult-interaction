import React, { useEffect, useState } from "react";
import { FieldConfig } from "../../../shared/types";
import InteractionsModal from "../InteractionsModal";
import Scripts from "../../../shared/utils/clientScripts";

interface EmailInModalProps {
  /** Закрыть модалку */
  closeModal: () => void;
  /** Идентификатор */
  interactionId?: string;
  text: string;
  setText: (value: string) => void;
}

/** Модальное окно звонка */
export default function EmailInModal({
  closeModal,
  interactionId,
  text,
  setText,
}: EmailInModalProps) {
  // от кого
  const [from, setFrom] = useState<string>("");
  // кому
  const [to, setTo] = useState<string>("");

  const fields: FieldConfig[] = [
    {
      type: "input",
      label: "Кому",
      value: to,
      setValue: setTo,
      style: { width: "232px" },
    },
    {
      type: "input",
      label: "От кого",
      value: from,
      setValue: setFrom,
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
      
  /** Сохранить email входящее */
  const saveEmailHandler = async () => {
    const isIncoming = true;
    await Scripts.addEmail(text, from, to, isIncoming, interactionId);
  };

  return (
    <InteractionsModal
      title="Email входящий"
      fields={fields}
      saveHandler={saveEmailHandler}
      closeModal={closeModal}
    />
  );
}
