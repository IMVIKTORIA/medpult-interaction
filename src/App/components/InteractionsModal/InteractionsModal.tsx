import React from "react";
import { ButtonType } from "../../shared/types";
import Button from "../../../UIKit/Button/Button";

interface InteractionsModalProps extends React.PropsWithChildren {
  /** Заголовок модального окна */
  title: string;
  /** Функция для сохранения данных */
  saveHandler?: () => Promise<void>;
  /** Отменить */
  closeModal: () => void;
}

/** Универсальное модальное окно */
export default function InteractionsModal({
  title,
  saveHandler,
  closeModal,
  children
}: InteractionsModalProps) {
  const onClickAdd = async () => {
    if (saveHandler) {
      await saveHandler();
    }
    closeModal();
  };

  const onClickCancel = () => {
    closeModal();
  };

  return (
    <div className="interactions-modal">
      <div className="interactions-modal__header">
        <span className="interactions-modal__label">{title}</span>
      </div>
      <div className="interactions-modal__content" style={{ width: "420px" }}>
        {/* Поля ввода */}
        <div className="interactions-modal__fields">
          {children}
        </div>
        {/* Кнопки */}
        <div className="interactions-modal__buttons">
          <Button title={"Добавить"} clickHandler={onClickAdd} />
          <Button
            title={"Отменить"}
            buttonType={ButtonType.outline}
            clickHandler={onClickCancel}
          />
        </div>
      </div>
    </div>
  );
}
