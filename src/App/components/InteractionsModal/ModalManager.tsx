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
}) => {
  const [text, setText] = useState<string>(initialText);
  const isModalOpen =
    isShowCommentModal ||
    isShowCallInModal ||
    isShowCallOutModal ||
    isShowSmsInModal ||
    isShowSmsOutModal ||
    isShowEmailInModal ||
    isShowEmailOutModal;

  useEffect(() => {
    if (isModalOpen && !initialText) {
      setText(""); // Сбрасываем текст если initialText пустой
    } else {
      setText(initialText); // Иначе используем initialText
    }
  }, [isModalOpen, initialText]);

  return (
    <>
      {isShowCommentModal && (
        <ModalWrapper>
          <CommentModal
            interactionId={interactionId}
            closeModal={closeModal}
            text={text}
            setText={setText}
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
            maskFunction={applyMaskPhone}
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
            maskFunction={applyMaskPhone}
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
            maskFunction={applyMaskPhone}
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
            maskFunction={applyMaskPhone}
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
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default ModalManager;
