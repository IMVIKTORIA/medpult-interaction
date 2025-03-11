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
          ? "interaction-column interaction-column__link"
          : "interaction-column"
      }
      style={{ flex: fr }}
    >
      <span
        title={title}
        onClick={onClick}
      >
        {children}
      </span>
    </div>
  );
}

export default InteractionListColumn;
