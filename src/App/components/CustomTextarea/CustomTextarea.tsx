import React, { useEffect, useRef, useState, FormEvent } from "react";
import { CustomInputProps } from "../../../UIKit/shared/types/types";

function CustomTextarea(props: CustomInputProps) {
  const {
    value = "",
    setValue,
    name,
    buttons,
    cursor = "text",
    clickHandler,
    isOpen = false,
    wrapperRef = useRef<HTMLDivElement>(null),
    readOnly = false,
    isViewMode = false,
    placeholder = "",
    maskFunction,
    isInvalid,
    customClassname,
    style,
    ...inputStyles
  } = props;

  /** Обработчик ввода в поле */
  const onInput: React.FormEventHandler<HTMLTextAreaElement> = (ev) => {
    if (!setValue) return;

    const target = ev.target as HTMLTextAreaElement;
    let newValue = target.value;
    // Обработка текста по маске
    if (maskFunction) newValue = maskFunction(newValue);

    // Запись значения в состояние
    setValue(newValue);
  };

  // Кнопки поля ввода
  const [buttonsWrapper, setButtonsWrapper] = useState<React.JSX.Element>();
  useEffect(() => {
    // Если режим редактирования и указаны кнопки, то отрисовать кнопки
    if (!isViewMode && buttons) {
      setButtonsWrapper(
        <div className="custom-textarea__buttons">{buttons}</div>
      );
    } else {
      setButtonsWrapper(undefined);
    }
  }, [buttons]);

  return (
    <div
      className={`custom-textarea__wrapper ${
        isOpen ? "custom-textarea__wrapper_open" : ""
      } ${isInvalid ? "custom-textarea__wrapper_invalid" : ""} ${
        customClassname ? customClassname : ""
      }`}
      ref={wrapperRef}
      style={style}
    >
      <textarea
        name={name}
        className="custom-textarea__textareaa"
        style={{
          cursor: cursor,
          boxShadow: "none",
        }}
        onInput={onInput}
        onClick={clickHandler}
        value={value}
        readOnly={readOnly || isViewMode}
        placeholder={placeholder}
        {...inputStyles}
      />
      {buttonsWrapper}
    </div>
  );
}

export default CustomTextarea;
