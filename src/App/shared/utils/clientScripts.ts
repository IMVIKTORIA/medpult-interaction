import moment from "moment";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import {
  InputDataCategory,
  InteractionsData,
  GetInteractionsResponse,
  InteractionsChannel,
  InteractionsCommentData,
  InteractionsEmailData,
  InteractionsCallData,
} from "../types";
import { fileSrc } from "./constants";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получение Взаимодействия */
async function getInteractions(
  appealId: string,
  taskId?: string
): Promise<GetInteractionsResponse> {
  const mockData: InteractionsData = {
    /** Идентификатор */
    id: appealId,
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 8:20").toDate(),
    isViewed: true,
    isSystem: true,
  };

  const mockData1: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session",
    /** Идентификатор */
    id: "1111111111111",
    /** Канал */
    channel: InteractionsChannel.incomingEmail,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 14:25").toDate(),
    isViewed: false,
    isSystem: true,
    logChan: "111",
  };

  const mockData2: InteractionsData = {
    /** Идентификатор */
    id: "11111111111112",
    /** Канал */
    channel: InteractionsChannel.comment,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 8:55").toDate(),
    isViewed: false,
    isSystem: false,
  };

  const mockData3: InteractionsData = {
    /** Идентификатор */
    id: "11111111111113",
    /** Канал */
    channel: InteractionsChannel.incomingCall,
    /** Фио */
    fio: "Оператор 2",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 10:30").toDate(),
    isViewed: false,
    isSystem: false,
  };

  const mockData4: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session",
    /** Идентификатор */
    id: "11111111111114",
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 8:55").toDate(),
    isViewed: false,
    isSystem: false,
  };

  const mockData5: InteractionsData = {
    /** Идентификатор */
    id: "11111111111115",
    /** Канал */
    channel: InteractionsChannel.outgoingSms,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 10:30").toDate(),
    isViewed: false,
    isSystem: false,
    numberPhone: "8 999 333 22 11",
  };

  const mockData6: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session",
    /** Идентификатор */
    id: "11111111111116",
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 8:55").toDate(),
    isViewed: false,
    isSystem: false,
  };

  const mockData7: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session1",
    /** Идентификатор */
    id: "111111111111161",
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 8:55").toDate(),
    isViewed: false,
    isSystem: false,
  };

  const mockData8: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session1",
    /** Идентификатор */
    id: "111111111111162",
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 8:55").toDate(),
    isViewed: false,
    isSystem: false,
  };

  await randomDelay();
  return {
    data: [
      mockData,
      mockData1,
      mockData2,
      mockData3,
      mockData4,
      mockData5,
      mockData6,
      mockData7,
      mockData8,
    ],
    hasMore: false,
  };
}

/** Получение полных Взаимодействий */
async function getInteractionsFulldata(
  interactionId: string
): Promise<InteractionsData> {
  const mockData: InteractionsData = {
    /** Идентификатор */
    id: interactionId,
    /** Номер ГП */
    channel: InteractionsChannel.outgoingEmail,
    /** Согласованные услуги */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Срок действия */
    comment: "Это электронное сообщение и любые документы",
    /** Дата отзыва */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Задача на отзыв */
    createdAt: moment("01.01.2024 17:00").toDate(),
    isViewed: false,
    isSystem: false,
  };

  await randomDelay();
  return mockData;
}

type SetVisibilityCallbackI = (appealId?: string) => void;
let changeTaskCallbackI: SetVisibilityCallbackI | undefined;
/** Установить функцию обратного вызова для изменения id обращения */
function setChangeTaskCallbackI(callback?: SetVisibilityCallbackI): void {
  changeTaskCallbackI = callback;
}

// 
// Для задачи
// 
  type ChangeRequestCallbackITask = (appealId?: string, taskId?: string) => void;
  let changeRequestCallbackITask: ChangeRequestCallbackITask | undefined;
  /** Установить функцию обратного вызова для изменения id обращения (Для взаимодействия с задачей) */
  function setChangeRequestCallbackITask(callback?: ChangeRequestCallbackITask): void {
    changeRequestCallbackITask = callback;
  }

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Получение проекта письма */
async function getInteractionsEmail(
  appealId: string
): Promise<InteractionsEmailData> {
  return {
    startDate: "10.03.2025 17:41",
    fioFrom: "Оператор 1",
    fioWhom: "103@sberins.ru",
    copy: "103@sberins.ru",
    topic: "Согласуйте МРТ",
    fileSrc: "433433",
    text: "Это электронное сообщение и любые документы, приложенные к нему, содержат конфиденциальную информацию. Настоящим уведомляем Вас о том, что если это сообщение не предназначено Вам, использование, копирование, распространение информации, содержащейся в настоящем сообщении, а также осуществление любых действий на основе этой информации, строго запрещено.",
  };
}

/** Получение комментария */
async function getInteractionsComment(
  appealId: string
): Promise<InteractionsCommentData> {
  return {
    startDate: "10.03.2025 17:41",
    fio: "Оператор 1",
    comment:
      "Это электронное сообщение и любые документы, приложенные к нему, содержат конфиденциальную информацию. Настоящим уведомляем Вас о том, что если это сообщение не предназначено Вам, использование, копирование, распространение информации, содержащейся в настоящем сообщении, а также осуществление любых действий на основе этой информации, строго запрещено.",
  };
}

/** Получение звонка */
async function getInteractionsCall(
  appealId: string
): Promise<InteractionsCallData> {
  return {
    startDate: "06.06.2024 17:00",
    fioFrom: "Оператор 2",
    fioWhom: "Медси",
    comment:
      "Это электронное сообщение и любые документы, приложенные к нему, содержат конфиденциальную информацию. Настоящим уведомляем Вас о том, что если это сообщение не предназначено Вам, использование, копирование, распространение информации, содержащейся в настоящем сообщении, а также осуществление любых действий на основе этой информации, строго запрещено.",
  };
}
/** Получение смс */
async function getInteractionsSms(
  appealId: string
): Promise<InteractionsCallData> {
  return {
    startDate: "06.06.2024 17:00",
    fioFrom: "Медси",
    fioWhom: "Оператор 1",
    comment:
      "Это электронное сообщение и любые документы, приложенные к нему, содержат конфиденциальную информацию. Настоящим уведомляем Вас о том, что если это сообщение не предназначено Вам, использование, копирование, распространение информации, содержащейся в настоящем сообщении, а также осуществление любых действий на основе этой информации, строго запрещено.",
  };
}

/** Добавить Взаимодейсвтие "комментарий" */
async function addCommentChannel(
  interactionId: string | undefined,
  text: string,
  /** Идентификатор задачи */
  taskId?: string
): Promise<void> {
  // TODO
  await sleep(1000);
}

/** Удалить Взаимодейтсвие */
async function deleteInteraction(interactionId: string): Promise<void> {
  // TODO
}

/** Добавить Взаимодейсвтие "Звонок" */
async function addCallInteraction(
  /** Текст сообщения */
  text: string,
  /** Номер телефона */
  number: string,
  /** Контактное лицо (Кому/От кого) */
  contractor: string,
  /** Является входящим */
  isIncoming: boolean,
  /** Идентификатор взаимодействия */
  interactionId?: string,
  /** Идентификатор задачи */
  taskId?: string
): Promise<void> {
  // TODO
  await sleep(1000);
}

/** Добавить Взаимодейсвтие "СМС" */
async function addSmsInteraction(
  /** Текст сообщения */
  text: string,
  /** Номер телефона */
  number: string,
  /** Контактное лицо (Кому/От кого) */
  contractor: string,
  /** Является входящим */
  isIncoming: boolean,
  /** Идентификатор взаимодействия */
  interactionId?: string,
  /** Идентификатор задачи */
  taskId?: string
): Promise<void> {
  // TODO
  await sleep(1000);
}

/** Добавить Взаимодейсвтие "Email" */
async function addEmail(
  /** Текст сообщения */
  text: string,
  /** От кого */
  from: string,
  /** Кому */
  to: string,
  /** Является входящим */
  isIncoming: boolean,
  /** Идентификатор взаимодействия */
  interactionId?: string,
  /** Идентификатор задачи */
  taskId?: string
): Promise<void> {
  // TODO
  await sleep(1000);
}

/** Функция обратного вызова для обновления списка обращений */
let reloadInteractionsCallback: () => void = () => {};
/** Обновить списка обращений */
async function reloadInteractionsList() {
  reloadInteractionsCallback();
}
/** Установить функцию обратного вызова для обновления списка обращений */
function setReloadInteractionsCallback(callback: () => void): void {
  reloadInteractionsCallback = callback;
}

/** Функция обратного вызова для обновления списка взаимодействий (в задаче) */
let reloadInteractionsTaskCallback: () => void = () => {};
/** Обновить списка взаимодействий (в задаче) */
async function reloadInteractionsTaskList() {
  reloadInteractionsTaskCallback();
}
/** Установить функцию обратного вызова для обновления списка взаимодействий (в задаче) */
function setReloadInteractionsTaskCallback(callback: () => void): void {
  reloadInteractionsTaskCallback = callback;
}

type OpenInteractionsCallback = (id: string) => void;
/** Функция обратного вызова для открытия согласования */
let setOpenInteractions: OpenInteractionsCallback | undefined;
/** Установить функцию обратного вызова для открытия согласования */
async function setOpenInteractionsCallback(
  callback: OpenInteractionsCallback
): Promise<void> {
  setOpenInteractions = callback;
}

/** Получение id обращения по id задачи */
async function getRequestIdByTaskId(appealId: string): Promise<string> {
  return "test";
}

/** Получение ссылки для перехода на страницу обращения */
async function getRequestLink(): Promise<string> {
  return "#test";
}

/** Получение списка каналов */
async function getChannel() {
  const data = [
    {
      value: "Все",
      data: {
        code: InteractionsChannel.allChannel,
      },
    },
    {
      value: "Комментарий",
      data: {
        code: InteractionsChannel.comment,
      },
    },
    {
      value: "Звонок входящий",
      data: {
        code: InteractionsChannel.incomingCall,
      },
    },
    {
      value: "Звонок исходящий",
      data: {
        code: InteractionsChannel.outgoingCall,
      },
    },
    {
      value: "Email входящий",
      data: {
        code: InteractionsChannel.incomingEmail,
      },
    },
    {
      value: "Email исходящий",
      data: {
        code: InteractionsChannel.outgoingEmail,
      },
    },
    {
      value: "СМС входящее",
      data: {
        code: InteractionsChannel.incomingSms,
      },
    },
    {
      value: "СМС исходящее",
      data: {
        code: InteractionsChannel.outgoingSms,
      },
    },
  ];

  await randomDelay();
  return data;
}

/** Получить количество взаимодействий */
async function getInteractionsCount(taskId?: string): Promise<number> {
  return 5;
}

/** Открыть модальное окно для отправки ответа на email */
async function toggleSendEmailAnswer(interactionId: string, taskId?: string) {
  try {
    alert("Send Answer on: " + interactionId);
  } catch (e) {
    throw new Error("Ошибка в функции toggleSendEmailAnswer: " + e);
  }
}

/** Открыть модальное окно для отправки ответа на email */
async function toggleSendEmailForward(interactionId: string, taskId?: string) {
  try {
    alert("Forward on: " + interactionId);
  } catch (e) {
    throw new Error("Ошибка в функции toggleSendEmailForward: " + e);
  }
}

/** Открыть модальное окно для отправки ответа на SMS */
async function toggleSendSmsAnswer(interactionId: string) {
  try {
    alert("Send Sms Amswer on: " + interactionId);
  } catch (e) {
    throw new Error("Ошибка в функции toggleSendSmsAnswer: " + e);
  }
}

/** Установить количество непросмотренных взаимодействий в обращении */
function setNewInteractionsCountRequest(count: number) {
  // TODO
  console.log("setNewInteractionsCountRequest: ", count);
}

/** Установить количество непросмотренных взаимодействий в задаче */
function setNewInteractionsCountTask(count: number) {
  // TODO
  console.log("setNewInteractionsCountTask: ", count);
}

/** Обновить флажок Просмотрено у взаимодействия */
async function updateIsInteractionViewed(interactionId: string): Promise<void> {
  // TODO
}

/** Получение списка Линий */
async function getLines(): Promise<{ code: string; name: string }[]> {
  await randomDelay();
  return [
    {
      code: "9f8e6dda-94f3-47f0-b69c-bc514a446b14",
      name: "103.test",
    },
    {
      code: "b97aa797-55a4-4429-a64d-e7c51910b33c",
      name: "sa-medpult-mail",
    },
  ];
}

export default {
  getInteractions,
  getInteractionsFulldata,
  setChangeTaskCallbackI,
  setReloadInteractionsCallback,
  setOpenInteractionsCallback,
  getRequestIdByTaskId,
  getRequestLink,

  getChannel,
  getInteractionsComment,
  getInteractionsEmail,
  getInteractionsCall,
  getInteractionsSms,

  addCommentChannel,
  addCallInteraction,
  addSmsInteraction,
  addEmail,
  deleteInteraction,

  getInteractionsCount,
  toggleSendEmailAnswer,
  toggleSendEmailForward,
  toggleSendSmsAnswer,

  setNewInteractionsCountRequest,
  updateIsInteractionViewed,
  getLines,

  setChangeRequestCallbackITask,
  setReloadInteractionsTaskCallback,
  setNewInteractionsCountTask
};
