import React from "react";

/** Пропсы колонки взаимодействия */
interface InteractionListColumnProps extends React.PropsWithChildren {
    /** Коэффициент соотношения ширины столбца */
    fr: number;
    /** Обработчик нажатия на колонку */
    onClick?: (ev?: any) => any;
    /** Текст при наведении */
    title?: string
};

function InteractionListColumn(props: InteractionListColumnProps) {
  const { fr, onClick, children, title } = props;

  return (
    <div
      className={
        onClick
          ? "custom-list-row-column custom-list-row-column__link"
          : "custom-list-row-column"
      }
      style={{ flex: fr }}
    >
      <span
        title={title}
        onClick={onClick}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default InteractionListColumn;
