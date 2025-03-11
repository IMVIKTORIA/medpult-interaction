import React from "react";
import {
  InteractionsChannel,
  InteractionsData,
  ListColumnData
} from "../../../shared/types";
import InteractionsDetails from "../InteractionsDetails/InteractionsDetails";
import InteractionChannelColumn from "./InteractionChannelColumn/InteractionChannelColumn";
import InteractionListColumn from "./InteractionListColumn/InteractionListColumn";
import moment from "moment";

/** Пропсы */
type InteractionRowProps = {
  /** Данные взаимодействия */
  data: InteractionsData;
  /** Список взаимодействий */
  items: InteractionsData[];
  /** Установить список взаимодействий */
  setItems: React.Dispatch<React.SetStateAction<InteractionsData[]>>;
  /** Индекс раскрытой строки */
  openRowIndex: string | undefined;
  /** Изменить индекс раскрытой строки */
  setOpenRowIndex: React.Dispatch<React.SetStateAction<string | undefined>>;
  /** Перезагрузить список */
  reloadData: () => void;
  /** Список выбранных каналов */
  selectedChannels: InteractionsChannel[];
  /** Счетчик писем в цепочке */
  chainLength?: number
};

/** Строка со взаимодействием */
function InteractionRow({
  data,
  items,
  setItems,
  openRowIndex,
  setOpenRowIndex,
  reloadData,
  selectedChannels,
  chainLength,
}: InteractionRowProps) {
  /** Фильтрация по каналам */
  if (
    !selectedChannels.includes(InteractionsChannel.allChannel) && // Если не выбраны все каналы
    !selectedChannels.includes(data.channel) // Если канал текущего элемента не находится в выбранных
  )
    return;

  /** Обработчик нажатия на строку */
  const toggleShowDetails = () => {
    if (data.id === undefined) return;

    if (String(data.id) == openRowIndex) {
      setOpenRowIndex(undefined);
      return;
    }

    setOpenRowIndex(String(data.id));
  };

  const isShowDetails = String(data.id) === openRowIndex;

  /** Обработчик нажатия на задачу */
  const handleTaskClick = (ev: any) => {
    ev.stopPropagation();
    console.log("Click task with id: " + data.task?.code)
  }

  /** Разметка шапки строки */
  const HeaderLayout = (
    <div className="custom-list-row-approval custom-list-row-approval_openable" onClick={toggleShowDetails}>
      {/* Канал */}
      <InteractionChannelColumn fr={0.25} isViewed={isShowDetails || data.isViewed} channel={data.channel}/>
      {/* Счетчик писем в цепочке*/}
      <InteractionListColumn fr={0.25}>
        {
          chainLength &&
          <div className="session-row__counter">
            {chainLength}
          </div>
        }
      </InteractionListColumn>
      {/* ФИО */}
      <InteractionListColumn fr={1}>{data.fio}</InteractionListColumn>
      {/* Тема */}
      <InteractionListColumn fr={1}>{data.topic}</InteractionListColumn>
      {/* Краткое содержание */}
      <InteractionListColumn fr={1}>{data.comment}</InteractionListColumn>
      {/* Задача */}
      <InteractionListColumn fr={1} onClick={handleTaskClick}>
        {data.task?.value ?? ""}
      </InteractionListColumn>
      {/* Дата создания */}
      <InteractionListColumn fr={1}>
        {moment(data.createdAt).format("DD.MM.YYYY HH:mm")}
      </InteractionListColumn>
    </div>
  )

  return (
    <>
      {/* Шапка */}
      {HeaderLayout}
      {/* Детальные данные строки */}
      {isShowDetails && (
        <InteractionsDetails
          reloadData={reloadData}
          data={data}
          onClickRowHandler={toggleShowDetails}
          items={items}
          setItems={setItems}
        />
      )}
    </>
  );
}

export default InteractionRow;
