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
  handleAddClick: (text: string) => void;
  handleCancelClick: () => void;
  interactionId?: string;
  initialText?: string;
}

const ModalManager: React.FC<ModalManagerProps> = ({
  isShowCommentModal,
  isShowCallInModal,
  isShowCallOutModal,
  isShowSmsInModal,
  isShowSmsOutModal,
  isShowEmailInModal,
  isShowEmailOutModal,
  handleAddClick,
  handleCancelClick,
  interactionId,
  initialText = "",
}) => {
  const [text, setText] = useState<string>(initialText);
  useEffect(() => {
    setText(initialText);
  }, [initialText]);
  return (
    <>
      {isShowCommentModal && (
        <ModalWrapper>
          <CommentModal
            interactionId={interactionId}
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            text={text}
            setText={setText}
          />
        </ModalWrapper>
      )}
      {isShowCallInModal && (
        <ModalWrapper>
          <CallInModal
            interactionId={interactionId}
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            text={text}
            setText={setText}
          />
        </ModalWrapper>
      )}
      {isShowCallOutModal && (
        <ModalWrapper>
          <CallOutModal
            interactionId={interactionId}
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            text={text}
            setText={setText}
          />
        </ModalWrapper>
      )}
      {isShowSmsInModal && (
        <ModalWrapper>
          <SmsInModal
            interactionId={interactionId}
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            text={text}
            setText={setText}
          />
        </ModalWrapper>
      )}
      {isShowSmsOutModal && (
        <ModalWrapper>
          <SmsOutModal
            interactionId={interactionId}
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            text={text}
            setText={setText}
          />
        </ModalWrapper>
      )}
      {isShowEmailInModal && (
        <ModalWrapper>
          <EmailInModal
            interactionId={interactionId}
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            text={text}
            setText={setText}
          />
        </ModalWrapper>
      )}
      {isShowEmailOutModal && (
        <ModalWrapper>
          <EmailOutModal
            interactionId={interactionId}
            handleAddClick={handleAddClick}
            handleCancelClick={handleCancelClick}
            text={text}
            setText={setText}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default ModalManager;
