import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import CommentModal from "./ChannelModal/CommentModal";
import CallInModal from "./ChannelModal/CallInModal";
import CallOutModal from "./ChannelModal/CallOutModal";
import SmsInModal from "./ChannelModal/SmsInModal";
import SmsOutModal from "./ChannelModal/SmsOutModal";
import EmailInModal from "./ChannelModal/EmailInModal";
import EmailOutModal from "./ChannelModal/EmailOutModal";

interface ModalManagerProps {
  isShowCommentModal: boolean;
  isShowCallInModal: boolean;
  isShowCallOutModal: boolean;
  isShowSmsInModal: boolean;
  isShowSmsOutModal: boolean;
  isShowEmailInModal: boolean;
  isShowEmailOutModal: boolean;
  closeModal: () => void;
  interactionId?: string;
  initialText?: string;
  initialFio?: string;
  initialPhone?: string;
  initialLogChan?: string;
  /** Перезагрузить список */
  reloadData?: () => void;
  /** Идентификатор задачи (Для взаимодействий в задаче) */
  taskId?: string
}

const applyMaskPhone = (value: string): string => {
  if (value === undefined) return "";
  const match = value.match(
    /(\+?7|8)\D*(\d{1,3})?\D*(\d{1,3})?\D*(\d{1,2})?\D*(\d{1,2})?/
  );
  if (!match) return "";
  return match
    .slice(1)
    .filter((val) => val)
    .join(" ")
    .replace(/^(7|8)/, "+7");
};

const ModalManager: React.FC<ModalManagerProps> = ({
  isShowCommentModal,
  isShowCallInModal,
  isShowCallOutModal,
  isShowSmsInModal,
  isShowSmsOutModal,
  isShowEmailInModal,
  isShowEmailOutModal,
  interactionId,
  closeModal,
  initialText = "",
  initialFio = "",
  initialPhone = "",
  initialLogChan = "",
  reloadData,
  taskId
}) => {
  const [text, setText] = useState<string>(initialText);
  const [fio, setFio] = useState<string>(initialFio);
  const [numberPhone, setNumberPhone] = useState<string>(initialPhone);
  const [logChan, setLogChan] = useState<string>(initialLogChan);
  const isModalOpen =
    isShowCommentModal ||
    isShowCallInModal ||
    isShowCallOutModal ||
    isShowSmsInModal ||
    isShowSmsOutModal ||
    isShowEmailInModal ||
    isShowEmailOutModal;

  // useEffect(() => {
  //   if (isModalOpen && !initialText) {
  //     setText(""); // Сбрасываем текст если initialText пустой
  //   } else {
  //     setText(initialText); // Иначе используем initialText
  //   }
  // }, [isModalOpen, initialText]);

  // useEffect(() => {
  //   if (isModalOpen && !initialFio) {
  //     setFio(""); // Сбрасываем текст если initialFio пустой
  //   } else {
  //     setFio(initialFio); // Иначе используем initialFio
  //   }
  // }, [isModalOpen, initialFio]);

  // useEffect(() => {
  //   if (isModalOpen && !initialPhone) {
  //     setNumberPhone(""); // Сбрасываем текст если initialPhone пустой
  //   } else {
  //     setNumberPhone(initialPhone); // Иначе используем initialPhone
  //   }
  // }, [isModalOpen, initialPhone]);

  useEffect(() => {
    // Сбрасываем или устанавливаем значения в зависимости от initial
    if (isModalOpen) {
      setText(initialText || "");
      setFio(initialFio || "");
      setNumberPhone(initialPhone || "");
      setLogChan(initialLogChan || "");
    }
  }, [isModalOpen, initialText, initialFio, initialPhone, initialLogChan]);
  return (
    <>
      {isShowCommentModal && (
        <ModalWrapper>
          <CommentModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
            reloadData={reloadData}
            taskId={taskId}
          />
        </ModalWrapper>
      )}
      {isShowCallInModal && (
        <ModalWrapper>
          <CallInModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
            fio={fio}
            setFio={setFio}
            numberPhone={numberPhone}
            setNumberPhone={setNumberPhone}
            maskFunction={applyMaskPhone}
            reloadData={reloadData}
            taskId={taskId}
          />
        </ModalWrapper>
      )}
      {isShowCallOutModal && (
        <ModalWrapper>
          <CallOutModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
            fio={fio}
            setFio={setFio}
            numberPhone={numberPhone}
            setNumberPhone={setNumberPhone}
            maskFunction={applyMaskPhone}
            reloadData={reloadData}
            taskId={taskId}
          />
        </ModalWrapper>
      )}
      {isShowSmsInModal && (
        <ModalWrapper>
          <SmsInModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
            fio={fio}
            setFio={setFio}
            numberPhone={numberPhone}
            setNumberPhone={setNumberPhone}
            maskFunction={applyMaskPhone}
            reloadData={reloadData}
            taskId={taskId}
          />
        </ModalWrapper>
      )}
      {isShowSmsOutModal && (
        <ModalWrapper>
          <SmsOutModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
            fio={fio}
            setFio={setFio}
            numberPhone={numberPhone}
            setNumberPhone={setNumberPhone}
            maskFunction={applyMaskPhone}
            reloadData={reloadData}
            taskId={taskId}
          />
        </ModalWrapper>
      )}
      {isShowEmailInModal && (
        <ModalWrapper>
          <EmailInModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
            fio={fio}
            setFio={setFio}
            logChan={logChan}
            setLogChan={setLogChan}
            reloadData={reloadData}
            taskId={taskId}
          />
        </ModalWrapper>
      )}
      {isShowEmailOutModal && (
        <ModalWrapper>
          <EmailOutModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
            fio={fio}
            setFio={setFio}
            logChan={logChan}
            setLogChan={setLogChan}
            reloadData={reloadData}
            taskId={taskId}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default ModalManager;
