import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import CustomSelect from "../../../../UIKit/CustomSelect/CustomSelect";
import { CustomSelectOption } from "../../../../UIKit/CustomSelect/CustomSelectTypes";
import Scripts from "../../../shared/utils/clientScripts";

/** Выпадающий список выбора Линии */
export default function ModalLineSelect({
  label,
  value,
  setValue,
  placeholder,
  style,
  maskFunction,
}: FieldConfig) {
  /** Полуение списка линий */
  const getDataHandler = async (): Promise<CustomSelectOption[]> => {
    const lines = await Scripts.getLines()

    return lines.map(line => {
      return {
        code: line.code,
        value: line.name,
      }
    })
  }

  return (
    <div className="modal-line-select__left">
      <span className="modal-line-select__label">
        {label}
      </span>
      <div className="modal-line-select__select">  
        <CustomSelect
          value={value}
          setValue={(value, code) => setValue(value)}
          placeholder={placeholder}
          maskFunction={maskFunction} 
          getDataHandler={getDataHandler}      
        />
      </div>
    </div>
  );
}
