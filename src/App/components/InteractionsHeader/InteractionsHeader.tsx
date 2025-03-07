import React, { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import Scripts from "../../shared/utils/clientScripts";
import CustomButton from "../CustomButton/CustomButton";
import icons from "../../shared/icons";
import { InteractionsChannel } from "../../shared/types";
import ChannelDropdown from "./ChannelDropdown/ChannelDropdown";
import ModalManager from "../InteractionsModal/ModalManager";

interface InteractionsHeaderProps {
  modalStates: {
    isShowCommentModal: boolean;
    setIsShowCommentModal: (value: boolean) => void;
    isShowCallInModal: boolean;
    setIsShowCallInModal: (value: boolean) => void;
    isShowCallOutModal: boolean;
    setIsShowCallOutModal: (value: boolean) => void;
    isShowSmsInModal: boolean;
    setIsShowSmsInModal: (value: boolean) => void;
    isShowSmsOutModal: boolean;
    setIsShowSmsOutModal: (value: boolean) => void;
    isShowEmailInModal: boolean;
    setIsShowEmailInModal: (value: boolean) => void;
    isShowEmailOutModal: boolean;
    setIsShowEmailOutModal: (value: boolean) => void;
  };
}
function InteractionsHeader({ modalStates }: InteractionsHeaderProps) {
  const {
    isShowCommentModal,
    setIsShowCommentModal,
    isShowCallInModal,
    setIsShowCallInModal,
    isShowCallOutModal,
    setIsShowCallOutModal,
    isShowSmsInModal,
    setIsShowSmsInModal,
    isShowSmsOutModal,
    setIsShowSmsOutModal,
    isShowEmailInModal,
    setIsShowEmailInModal,
    isShowEmailOutModal,
    setIsShowEmailOutModal,
  } = modalStates;

  const [formValues, setFormValues] = useState<{ channel?: string[] }>({
    channel: [InteractionsChannel.allChannel], // Дефолтное значение "Все"
  });

  const handleInputChange = (name: string, value: string[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.length > 0 ? value : [InteractionsChannel.allChannel],
    }));
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleAddChannel = () => {
    setDropdownOpen((prev) => !prev);
  };

  // TODO логика для модального окна
  const handleSelectChannel = (channel: string) => {
    setDropdownOpen(false);
    if (channel === InteractionsChannel.comment) {
      setIsShowCommentModal(true);
    }
    if (channel === InteractionsChannel.incomingCall) {
      setIsShowCallInModal(true);
    }
    if (channel === InteractionsChannel.outgoingCall) {
      setIsShowCallOutModal(true);
    }
    if (channel === InteractionsChannel.incomingSms) {
      setIsShowSmsInModal(true);
    }
    if (channel === InteractionsChannel.outgoingSms) {
      setIsShowSmsOutModal(true);
    }
    if (channel === InteractionsChannel.incomingEmail) {
      setIsShowEmailInModal(true);
    }
    if (channel === InteractionsChannel.outgoingEmail) {
      setIsShowEmailOutModal(true);
    }
  };
  
  /** Закрыть модальное окно */
  const closeModal = () => {
    setIsShowCommentModal(false);
    setIsShowCallInModal(false);
    setIsShowCallOutModal(false);
    setIsShowSmsInModal(false);
    setIsShowSmsOutModal(false);
    setIsShowEmailInModal(false);
    setIsShowEmailOutModal(false);
  }

  return (
    <>
      <div className="interaction-header">
        <div className="interaction-header__channel">
          <label className="interaction-header__label">Канал поступления</label>

          <CustomSelect
            getDataHandler={Scripts.getChannel}
            inputHandler={handleInputChange}
            name="channel"
            values={formValues}
          />
        </div>
        <div className="interaction-header__buttons">
          <CustomButton
            title={"ОБЪЕДИНИТЬ ОБРАЩЕНИЕ"}
            clickHandler={""}
            svg={icons.Сlip}
            svgPosition="left"
          />
          <div
            className="dropdown-container"
            style={{ position: "relative", display: "inline-block" }}
          >
            <CustomButton
              className={`button-custom ${isDropdownOpen ? "active" : ""}`}
              title={"ДОБАВИТЬ"}
              clickHandler={handleAddChannel}
              svg={icons.Triangle}
              svgPosition="right"
            />
            {isDropdownOpen && (
              <ChannelDropdown onSelect={handleSelectChannel} />
            )}
          </div>
        </div>
      </div>
      {/* Модальные окна */}
      <ModalManager
        isShowCommentModal={isShowCommentModal}
        isShowCallInModal={isShowCallInModal}
        isShowCallOutModal={isShowCallOutModal}
        isShowSmsInModal={isShowSmsInModal}
        isShowSmsOutModal={isShowSmsOutModal}
        isShowEmailInModal={isShowEmailInModal}
        isShowEmailOutModal={isShowEmailOutModal}
        closeModal={closeModal}
      />
    </>
  );
}

export default InteractionsHeader;
