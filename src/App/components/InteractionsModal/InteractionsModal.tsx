import React, { useState } from "react";
import Loader from "../Loader/Loader";
import { ButtonType, FieldType } from "../../shared/types";
import Button from "../../../UIKit/Button/Button";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import CustomTextarea from "../CustomTextarea/CustomTextarea";
import { FieldConfig } from "../../shared/types";
import ModalInput from "./ModalInput/ModalInput";
import ModalTextarea from "./ModalTextarea/ModalTextarea";

interface InteractionsModalProps extends React.PropsWithChildren {
  /** Заголовок модального окна */
  title: string;
  /** Конфигурация полей ввода */
  fields?: FieldConfig[];
  /** Функция для сохранения данных */
  saveHandler?: () => Promise<void>;
  /** Отменить */
  closeModal: () => void;
}

/** Универсальное модальное окно */
export default function InteractionsModal({
  title,
  fields,
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
        <div className="interactions-modal__text">
          {fields && fields.map((field, index) => (
            <>
              {field.type === FieldType.input ? (
                <ModalInput {...field} />
              ) : (
                <ModalTextarea {...field} />
              )}
            </>
          ))}
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
