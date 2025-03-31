import React, { useEffect, useReducer, useRef, useState } from "react";
import CustomSelectRow from "../CustomSelectRow/CustomSelectRow";
import CustomInput from "../CustomInput/CustomInput";
import {
  CustomInputProps,
  IInputData,
  InteractionsChannel,
} from "../../shared/types";
import InputButton from "../InputButton/InputButton";
import Loader from "../Loader/Loader";
import icons from "../../shared/icons";
import CustomSelectList from "../CustomSelectList/CustomSelectList";
import CustomListSelector from "../../../UIKit/CustomList/CustomListSelector/CustomListSelector";

interface CustomSelectProps extends CustomInputProps {
  getDataHandler: () => Promise<IInputData[]>;
  isViewMode?: boolean;
  isInvalid?: boolean;
  /** Присвоить выбранные строки */
  selectedItems?: string[];
  /** Присвоить выбранные строки */
  setSelectedItems?: (ids: string[]) => void;
}

function CustomSelect(props: CustomSelectProps) {
  const {
    isViewMode,
    getDataHandler,
    inputHandler,
    name,
    values,
    isInvalid,
    selectedItems = [],
    setSelectedItems,
    ...customInputProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listWidth, setListWidth] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listValues, setListValues] = useState<IInputData[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const values = await getDataHandler();
      setListValues(values);
      setIsLoading(false);
    };

    fetchData();
  }, [getDataHandler]);

  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    return values[name]?.length > 0
      ? values[name]
      : [InteractionsChannel.allChannel];
  });

  const clickHandler = async () => {
    if (isViewMode) return;
    if (isOpen) return;
    // Показать список
    setIsOpen(true);
    // Показать лоадер
    setIsLoading(true);
    // Показать данные
    setListValues([]);
    const values = await getDataHandler();
    setListValues(values);
    // Скрыть лоадер
    setIsLoading(false);
  };

  const toggleCheckedRow = (code: string) => {
    setSelectedValues((prevSelected) => {
      let newSelected;

      if (code === InteractionsChannel.allChannel) {
        // Если выбрали Все, то сбрасываем всё и оставляем только Все
        newSelected = [InteractionsChannel.allChannel];
      } else {
        // Если выбрали другой пункт, убираем Все
        newSelected = prevSelected.includes(code)
          ? prevSelected.filter((c) => c !== code)
          : [
              ...prevSelected.filter(
                (c) => c !== InteractionsChannel.allChannel
              ),
              code,
            ];

        // Если ничего не выбрано, ставим Все
        if (newSelected.length === 0) {
          newSelected = [InteractionsChannel.allChannel];
        }
      }

      if (setSelectedItems) setSelectedItems(newSelected);
      if (inputHandler) inputHandler(name, newSelected);

      return newSelected;
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    setListWidth(wrapper.getBoundingClientRect().width);
  }, [isOpen]);

  const buttonSvg = icons.Triangle;

  const displayedValues = listValues
    .filter((item) => selectedValues.includes(item.data?.code))
    .map((item) => item.value);

  const handleMouseEnter = async () => {
    if (isViewMode) return;

    setIsHovered(true);

    if (!isOpen) {
      setIsOpen(true);
      setIsLoading(true);
      const values = await getDataHandler();
      setListValues(values);
      setIsLoading(false);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      rootRef.current &&
      !rootRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsHovered(false);
      setIsOpen(false);
    }
  };

  return (
    <div
      className="custom-select"
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CustomInput
        values={{ [name]: displayedValues }}
        name={name}
        clickHandler={clickHandler}
        wrapperRef={wrapperRef}
        cursor={isViewMode ? "text" : "pointer"}
        isOpen={isOpen}
        buttons={[<InputButton svg={buttonSvg} clickHandler={clickHandler} />]}
        isViewMode={isViewMode}
        isInvalid={isInvalid}
        {...customInputProps}
        readOnly
      />
      {(isOpen || isHovered) && (
        <CustomSelectList
          rootRef={rootRef}
          isOpen={isOpen}
          closeHandler={() => setIsOpen(false)}
          isLoading={isLoading}
          listWidth={listWidth}
        >
          {listValues.map((value) => (
            <CustomSelectRow
              key={value.data?.code}
              value={value.value}
              code={value.data?.code}
              toggleChecked={() => toggleCheckedRow(value.data?.code)}
              isSelected={selectedValues.includes(value.data?.code)}
            />
          ))}
        </CustomSelectList>
      )}
    </div>
  );
}

export default CustomSelect;
