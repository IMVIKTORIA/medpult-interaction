import React, { useState } from "react";
import { InteractionsChannel, InteractionsData } from "../../../shared/types";
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
  taskId,
}: SessionRowProps) {
  /** Фильтрация по каналам */
  if (
    !selectedChannels.includes(InteractionsChannel.allChannel) && // Если не выбраны все каналы
    !selectedChannels.includes(InteractionsChannel.incomingEmail) && // Если не выбран канал входящих email
    !selectedChannels.includes(InteractionsChannel.outgoingEmail) // Если не выбран канал исходящих email
  )
    return;
  if (!interactions.length) return null;

  const mainInteraction = interactions[interactions.length - 1];
  const otherInteractions = interactions.slice(0, -1);

  // состояние для раскрытия цепочки
  const [openWrapperId, setOpenWrapperId] = useState<string | undefined>();
  const isOpen = openWrapperId === String(mainInteraction.id);

  return (
    <div className="session-row">
      {/*Обертка */}
      <InteractionRow
        data={mainInteraction}
        items={items}
        setItems={setItems}
        openRowIndex={openRowIndex}
        setOpenRowIndex={setOpenRowIndex}
        reloadData={reloadData}
        selectedChannels={selectedChannels}
        chainLength={interactions.length > 0 ? interactions.length : undefined}
        taskId={taskId}
        isReply={false}
        isWrapperRow={true}
        onClickHeader={() =>
          setOpenWrapperId(isOpen ? undefined : String(mainInteraction.id))
        }
        isOpen={isOpen}
      />

      {isOpen && (
        <div className="session-row__details">
          {/* Письма из цепочки */}
          {otherInteractions.map((item) => (
            <InteractionRow
              key={item.id}
              data={item}
              items={items}
              setItems={setItems}
              openRowIndex={openRowIndex}
              setOpenRowIndex={setOpenRowIndex}
              reloadData={reloadData}
              selectedChannels={selectedChannels}
              taskId={taskId}
              isReply={true}
              isWrapperRow={false}
            />
          ))}

          {/* Главное письмо */}
          <InteractionRow
            key={mainInteraction.id + "_main"}
            data={mainInteraction}
            items={items}
            setItems={setItems}
            openRowIndex={openRowIndex}
            setOpenRowIndex={setOpenRowIndex}
            reloadData={reloadData}
            selectedChannels={selectedChannels}
            taskId={taskId}
            isReply={true}
            isWrapperRow={false}
          />
        </div>
      )}
    </div>
  );
}

export default SessionRow;
