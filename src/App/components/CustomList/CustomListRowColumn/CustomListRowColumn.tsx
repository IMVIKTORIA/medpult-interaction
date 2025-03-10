import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  IInputData,
  ListColumnData,
  InteractionsChannel,
  InputDataCategory,
} from "../../../shared/types";
import icons from "../../../shared/icons";

interface ListColumnProps extends ListColumnData {
  data: IInputData;
  isViewed?: boolean;
}
const channelIcons = {
  [InteractionsChannel.comment]: icons.imgComment,
  [InteractionsChannel.incomingEmail]: icons.imgIncomingEmail,
  [InteractionsChannel.outgoingEmail]: icons.imgOutgoingEmail,
  [InteractionsChannel.incomingCall]: icons.imgIncomingCall,
  [InteractionsChannel.outgoingCall]: icons.imgOutgoingCall,
  [InteractionsChannel.incomingSms]: icons.imgIncomingSms,
  [InteractionsChannel.outgoingSms]: icons.imgOutgoingSms,
};

function CustomListRowColumn(props: ListColumnProps) {
  const { fr, data, isLink, onClick, isIcon, isViewed } = props;

  const onClickColumn =
    isLink && onClick
      ? () => {
          onClick(data);
        }
      : () => {};

  const iconToShow = channelIcons[data.data.code];
  const iconToShowRead = !isViewed ? icons.circleRead : icons.circleNoRead;

  return (
    <div
      className={
        isLink
          ? "custom-list-row-column custom-list-row-column__link"
          : "custom-list-row-column"
      }
      style={{ flex: fr }}
    >
      <span
        title={data.value}
        onClick={onClickColumn}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {isIcon && (
          <div style={{ display: "flex", alignItems: "center", gap:"20px" }}>
            {iconToShowRead}
            {iconToShow}
          </div>
        )}
        {!isIcon && data.value}
      </span>
    </div>
  );
}

export default CustomListRowColumn;
