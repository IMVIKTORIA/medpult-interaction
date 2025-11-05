import React from "react";
import { InteractionsStatus } from "../../../../shared/types";
import InteractionListColumn from "../InteractionListColumn/InteractionListColumn";
import icons from "../../../../shared/icons";

/** Пропсы колонки взаимодействия */
interface InteractionStatusColumnProps extends React.PropsWithChildren {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Статус  */
  status: InteractionsStatus;
}

function InteractionStatusColumn(props: InteractionStatusColumnProps) {
  const { status, ...restProps } = props;

  /** Получение иконки по статусу взаимодействия */
  const getIcon = () => {
    switch (status) {
      case InteractionsStatus.new:
        return icons.InteracrionNew;
      case InteractionsStatus.queue:
        return icons.InteracrionQueue;
      case InteractionsStatus.atWork:
        return icons.InteracrionAtWork;
      case InteractionsStatus.processed:
        return icons.InteracrionProcessed;
      case InteractionsStatus.missed:
        return icons.InteracrionMissed;
      default:
        throw new Error("Неверный статус взаимодействия");
    }
  };

  /** Получение title по статусу взаимодействия */
  const getTitle = () => {
    switch (status) {
      case InteractionsStatus.new:
        return "Новое";
      case InteractionsStatus.queue:
        return "В очереди";
      case InteractionsStatus.atWork:
        return "В работе";
      case InteractionsStatus.processed:
        return "Обработано";
      case InteractionsStatus.missed:
        return "Пропущено";
      default:
        return;
    }
  };

  return (
    <InteractionListColumn {...restProps} title={getTitle()}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {getIcon()}
      </div>
    </InteractionListColumn>
  );
}

export default InteractionStatusColumn;
