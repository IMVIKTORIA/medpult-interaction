import React from "react";
import { InteractionsChannel } from "../../../../shared/types";
import InteractionListColumn from "../InteractionListColumn/InteractionListColumn";
import icons from "../../../../shared/icons";

/** Пропсы колонки взаимодействия */
interface InteractionChannelColumnProps extends React.PropsWithChildren {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Просмотрено? */
  // isViewed: boolean;
  /** Канал  */
  channel: InteractionsChannel;
}

function InteractionChannelColumn(props: InteractionChannelColumnProps) {
  const { channel, ...restProps } = props;

  /** Получение иконки по каналу взаимодействия */
  const getIcon = () => {
    switch (channel) {
      case InteractionsChannel.comment:
        return icons.imgComment;
      case InteractionsChannel.incomingEmail:
        return icons.imgIncomingEmail;
      case InteractionsChannel.outgoingEmail:
        return icons.imgOutgoingEmail;
      case InteractionsChannel.incomingCall:
        return icons.imgIncomingCall;
      case InteractionsChannel.outgoingCall:
        return icons.imgOutgoingCall;
      case InteractionsChannel.incomingSms:
        return icons.imgIncomingSms;
      case InteractionsChannel.outgoingSms:
        return icons.imgOutgoingSms;
      default:
        throw new Error("Неверный канал взаимодействия");
    }
  };

  /** Получение title по каналу взаимодействия */
  const getTitle = () => {
    switch (channel) {
      case InteractionsChannel.comment:
        return "Комментарий";
      case InteractionsChannel.incomingEmail:
        return "Входящий email";
      case InteractionsChannel.outgoingEmail:
        return "Исходящий email";
      case InteractionsChannel.incomingCall:
        return "Входящий звонок";
      case InteractionsChannel.outgoingCall:
        return "Исходящий звонок";
      case InteractionsChannel.incomingSms:
        return "Входящее СМС";
      case InteractionsChannel.outgoingSms:
        return "Исходящее СМС";
      default:
        return;
    }
  };

  /** Иконка состояния прочитано */
  //const isReadIcon = !isViewed ? icons.circleRead : icons.circleNoRead;

  return (
    <InteractionListColumn {...restProps} title={getTitle()}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* {isReadIcon} */}
        {getIcon()}
      </div>
    </InteractionListColumn>
  );
}

export default InteractionChannelColumn;
