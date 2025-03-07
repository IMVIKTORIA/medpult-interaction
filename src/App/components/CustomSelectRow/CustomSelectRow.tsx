import React, { useEffect, useState } from "react";
import CustomListSelector from "../../../UIKit/CustomList/CustomListSelector/CustomListSelector";

function CustomSelectRow({
  value,
  code,
  data,
  toggleChecked,
  isSelected,
}: {
  value: string;
  code?: string;
  data?: any;
  isSelected: boolean;
  toggleChecked: () => void;
}) {
  const clickHandler = (ev: any) => {
    ev.stopPropagation()
    toggleChecked();
  }

  return (
    <div className="custom-select__row1">
      <CustomListSelector
        onClickSelector={clickHandler}
        isChecked={isSelected}
      />
      {value}
    </div>
  );
}

export default CustomSelectRow;
