import React from "react";
import {
  InteractionsChannel,
  InteractionsData
} from "../../../shared/types";
import InteractionRow from "../InteractionRow/InteractionRow";

/** Пропсы */
type SessionRowProps = {
  /** Данные взаимодействия */
  interactions: InteractionsData[];
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
  /** Идентификатор задачи */
  taskId?: string;
};

/** Строка с цепочкой писем */
function SessionRow({
  interactions,
  items,
  setItems,
  openRowIndex,
  setOpenRowIndex,
  reloadData,
  selectedChannels,
  taskId
}: SessionRowProps) {
  /** Фильтрация по каналам */
  if (
    !selectedChannels.includes(InteractionsChannel.allChannel) && // Если не выбраны все каналы
    !selectedChannels.includes(InteractionsChannel.incomingEmail) && // Если не выбран канал входящих email
    !selectedChannels.includes(InteractionsChannel.outgoingEmail) // Если не выбран канал исходящих email
  ) return;

  return (
    <div className="session-row">
        {interactions.map((data, index) => 
            <InteractionRow
              data={data}
              items={items}
              setItems={setItems}
              openRowIndex={openRowIndex}
              setOpenRowIndex={setOpenRowIndex}
              reloadData={reloadData}
              selectedChannels={selectedChannels}
              chainLength={index == 0 && interactions.length > 1 ? interactions.length - 1 : undefined}
              taskId={taskId}
            />
        )}
    </div>
  );
}

export default SessionRow;
