import React from "react";

/** Пропсы колонки взаимодействия */
interface InteractionListColumnProps extends React.PropsWithChildren {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Обработчик нажатия на колонку */
  onClick?: (ev?: React.MouseEvent<HTMLSpanElement>) => any;
  /** Текст при наведении */
  title?: string;
  /** Обработчик наведения */
  onMouseEnter?: (ev?: React.MouseEvent<HTMLDivElement>) => any;
  /** Обработчик ухода */
  onMouseLeave?: (ev?: React.MouseEvent<HTMLDivElement>) => any;
}

function InteractionListColumn(props: InteractionListColumnProps) {
  const { fr, onClick, children, title, onMouseEnter, onMouseLeave } = props;

  return (
    <div
      className={
        onClick
          ? "interaction-column interaction-column__link"
          : "interaction-column"
      }
      style={{ flex: fr }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span title={title} onClick={onClick}>
        {children}
      </span>
    </div>
  );
}

export default InteractionListColumn;
