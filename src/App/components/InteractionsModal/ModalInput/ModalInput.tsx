import React, { useState } from "react";
import { FieldConfig } from "../../../shared/types";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";

/** Поле ввода в модальном окне */
export default function ModalInput({
  label,
  value,
  setValue,
  placeholder,
  style,
  maskFunction,
}: FieldConfig) {
  return (
    <div className="modal-input__left">
      <span className="modal-input__label">
        {label}
      </span>
      <CustomInput
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        style={style}
        maskFunction={maskFunction}
      />
    </div>
  );
}
