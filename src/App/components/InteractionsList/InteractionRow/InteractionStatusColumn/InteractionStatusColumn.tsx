import React from "react";
import { InteractionsStatus } from "../../../../shared/types";
import InteractionListColumn from "../InteractionListColumn/InteractionListColumn";
import icons from "../../../../shared/icons";

/** Пропсы колонки взаимодействия */
interface InteractionStatusColumnProps extends React.PropsWithChildren {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Статус  */
  statusName: string;
  statusCode: string;
}

function InteractionStatusColumn(props: InteractionStatusColumnProps) {
  const { statusName, statusCode, ...restProps } = props;

  /** Получение иконки по статусу взаимодействия */
  const getIcon = (statusCode: string) => {
    switch (statusCode) {
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
        return null;
    }
  };

  return (
    <InteractionListColumn {...restProps} title={statusName}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {getIcon(statusCode)}
      </div>
    </InteractionListColumn>
  );
}

export default InteractionStatusColumn;
