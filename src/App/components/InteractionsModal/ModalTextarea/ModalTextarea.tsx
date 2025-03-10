import React, { useState } from "react";
import { FieldConfig } from "../../../shared/types";
import CustomTextarea from "../../CustomTextarea/CustomTextarea";

/** Поле текстового ввода в модальном окне */
export default function ModalTextarea({
  label,
  value,
  setValue,
  placeholder,
  style,
  maskFunction,
}: FieldConfig) {
  return (
    <>
      <span className="modal-textarea__label">
        {label}
      </span>
      <CustomTextarea
        value={value}
        setValue={setValue}
        style={style}
      />
    </>
  );
}
