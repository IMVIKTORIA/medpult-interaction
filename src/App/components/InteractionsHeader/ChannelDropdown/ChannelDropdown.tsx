import React, { useEffect, useRef, useState } from "react";
import ChannelDropdownList from "./ChannelDropdownList/ChannelDropdownList";
import CustomButton from "../../CustomButton/CustomButton";
import icons from "../../../shared/icons";
import { useOutsideClickHandler } from "../../../shared/utils/utils";

type ChannelDropdownProps = {
  /** Обработчик нажатия на канал в выпадающем списке */
  handleSelectChannel: (channel: string) => void
}

function ChannelDropdown({handleSelectChannel}: ChannelDropdownProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleAddClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (channel: string) => {
    setDropdownOpen(false);
    handleSelectChannel(channel)
  }

  const handleOutsideClick = () => setDropdownOpen(false);

  const rootRef = useRef<HTMLDivElement>(null)
  useOutsideClickHandler(rootRef, handleOutsideClick);

  return (
    <div
      className="dropdown-container"
      ref={rootRef}
    >
      <CustomButton
        className={`button-custom ${isDropdownOpen ? "active" : ""}`}
        title={"Добавить"}
        clickHandler={handleAddClick}
        svg={icons.Triangle16}
        svgPosition="right"
      />
      {isDropdownOpen && <ChannelDropdownList onSelect={handleOptionClick} />}
    </div>
  );
}

export default ChannelDropdown;
