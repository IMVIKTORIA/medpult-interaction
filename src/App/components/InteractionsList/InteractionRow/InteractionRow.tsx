import React, { useState } from "react";
import {
  InteractionsChannel,
  InteractionsData,
  ListColumnData,
} from "../../../shared/types";
import InteractionsDetails from "../InteractionsDetails/InteractionsDetails";
import InteractionChannelColumn from "./InteractionChannelColumn/InteractionChannelColumn";
import InteractionStatusColumn from "./InteractionStatusColumn/InteractionStatusColumn";
import InteractionListColumn from "./InteractionListColumn/InteractionListColumn";
import moment from "moment";
import icons from "../../../shared/icons";
import utils from "../../../shared/utils/utils";
import Scripts from "../../../shared/utils/clientScripts";
import { localStorageDraftKey } from "../../../shared/utils/constants";

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
  chainLength?: number;
  /** Идентификатор задачи */
  taskId?: string;
  isReply?: boolean;
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
  taskId,
  isReply,
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
  const isUserShowDetails = isShowDetails && !data.isUser;

  /** Обработчик нажатия на задачу */
  const handleTaskClick = async (ev?: React.MouseEvent<HTMLSpanElement>) => {
    // Остановить распространение
    if (ev) ev.stopPropagation();

    if (!data.task?.value) {
      await Scripts.toggleBindInteraction(data.id);
      reloadData();
      return;
    }

    console.log("Click task with id: " + data.task?.code);
    const taskId = data.task?.code;
    if (!taskId) return;
    // Установка обращения
    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    utils.setRequest(requestId);

    localStorage.setItem("taskId", taskId);
    localStorage.setItem(localStorageDraftKey, JSON.stringify(data));

    // Переход
    const link = await Scripts.getRequestLink();
    // utils.redirectSPA(link)

    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    if (taskId) redirectUrl.searchParams.set("task_id", taskId);
    //utils.redirectSPA(redirectUrl.toString());
    window.open(redirectUrl.toString(), "_blank");
  };

  // const handleTaskClick = (ev: any) => {
  //   ev.stopPropagation();
  //   console.log("Click task with id: " + data.task?.code);
  // };
  /** Получить текст из строки с HTML */
  const getTextFromHTMLString = (innerHTML: string) => {
    // Создание элемента
    const element = document.createElement("div");
    // Запись HTML
    element.innerHTML = innerHTML;
    // Получение текста без тегов
    const text = element.innerText;
    // Удаление элемента
    element.remove();

    return text;
  };

  const getIconSMS = () => {
    const statusCode = data.statusCode;
    switch (statusCode) {
      case "sent":
        return icons.SmsSent;
      case "delivered":
        return icons.SmsDelivered;
      case "undelivered":
        return icons.SmsError;
      case "attention":
        return icons.SmsAttention;
      default:
        return null;
    }
  };

  const [isTooltipVisible, setTooltipVisible] = useState(false);

  /** Разметка шапки строки */
  const HeaderLayout = (
    <div
      className="interaction-row interaction-row_openable"
      onClick={toggleShowDetails}
    >
      {/* Статус */}
      <InteractionStatusColumn
        fr={0.15}
        statusName={data.status.value}
        statusCode={data.status.code}
      />
      {/* Канал */}
      <InteractionChannelColumn
        fr={0.25}
        //isViewed={isUserShowDetails || data.isViewed}
        channel={data.channel}
      />
      {/* ФИО */}
      <InteractionListColumn fr={1} title={data.fio}>
        {data.fio}
      </InteractionListColumn>

      {/* Тема + доп. элементы */}
      <InteractionListColumn fr={2} title={data.topic}>
        <div className="interaction-row__group">
          {chainLength && (
            <div className="interaction-row__group__counter">{chainLength}</div>
          )}
          {/* Стрелка у ответа письма в цепочке */}
          {isReply && <div>{icons.AnswerArrow}</div>}
          {/* Статус СМС */}
          {data.channel === InteractionsChannel.outgoingSms && (
            <div>{getIconSMS()}</div>
          )}
          {/* Текст темы */}
          <span className="interaction-row__group__text">{data.topic}</span>
        </div>
      </InteractionListColumn>

      {/* Задача */}
      {!taskId && ( //только для обращения
        <InteractionListColumn
          fr={1}
          onClick={handleTaskClick}
          title={data.task?.value}
        >
          {data.task?.value || icons.Сlip}
        </InteractionListColumn>
      )}
      {/* Дата создания */}
      <InteractionListColumn fr={1} title={data.createdAt}>
        {data.createdAt}
      </InteractionListColumn>
      {/* Скрепка*/}
      <InteractionListColumn fr={0.25} title={"Есть вложение"}>
        {(data.channel === InteractionsChannel.incomingEmail ||
          data.channel === InteractionsChannel.outgoingEmail) &&
          data.fileSrc && <div>{icons.paperСlip}</div>}
      </InteractionListColumn>
      {/* Развернуть*/}
      <InteractionListColumn fr={0.25}>
        <div
          style={{
            transform: isShowDetails ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {icons.Triangle24}
        </div>
      </InteractionListColumn>
    </div>
  );

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
          taskId={taskId}
        />
      )}
    </>
  );
}

export default InteractionRow;

// {/* Счетчик писем в цепочке*/}
// <InteractionListColumn fr={0.25}>
//   {chainLength && (
//     <div className="interaction-row__counter">{chainLength}</div>
//   )}
// </InteractionListColumn>
// {/* Стрелка у ответа письма в цепочке*/}
// <InteractionListColumn fr={0.25}>
//   {isReply && <div className="">{icons.AnswerArrow}</div>}
// </InteractionListColumn>
// {/* Статус СМС*/}
// <InteractionListColumn
//   fr={0.25}
//   // onMouseEnter={() => setTooltipVisible(true)}
//   // onMouseLeave={() => setTooltipVisible(false)}
// >
//   {data.channel === InteractionsChannel.outgoingSms && (
//     <div>
//       {/* {isTooltipVisible && (
//         <div className="tooltip">
//           {data.channel === InteractionsChannel.outgoingSms
//             ? getSubstatusName(data.statusCode)
//             : undefined}
//         </div>
//       )} */}
//       {getIconSMS()}
//     </div>
//   )}
// </InteractionListColumn>

// {/* Тема */}
// <InteractionListColumn fr={1} title={data.topic}>
//   {data.topic}
// </InteractionListColumn>
// {/* Краткое содержание */}
// <InteractionListColumn fr={1} title={getTextFromHTMLString(data.comment)}>
//   {getTextFromHTMLString(data.comment)}
// </InteractionListColumn>
