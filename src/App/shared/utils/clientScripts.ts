import moment from "moment";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import {
  InputDataCategory,
  InteractionsData,
  InteractionDetailsData,
  GetInteractionsResponse,
  InteractionsChannel,
  InteractionsStatus,
  FilesData,
} from "../types";
//import { fileSrc } from "./constants";

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
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
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
    createdAt: moment("12.03.2025 8:20").format("DD.MM.YYYY HH:mm"),
    isViewed: true,
    isSystem: true,
  };

  const mockData1: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session",
    /** Идентификатор */
    id: "1111111111111",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Канал */
    channel: InteractionsChannel.incomingEmail,
    /** Фио */
    fio: "Медси",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("03.12.2025 14:25").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: true,
    logChan: "111",
  };

  const mockData2: InteractionsData = {
    /** Идентификатор */
    id: "11111111111112",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Канал */
    channel: InteractionsChannel.comment,
    /** Фио */
    fio: "Оператор 1",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "", code: "" },
    /** Дата  */
    createdAt: moment("03.31.2025 12:30").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: false,
    isUser: false,
  };

  const mockData3: InteractionsData = {
    /** Идентификатор */
    id: "11111111111113",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Канал */
    channel: InteractionsChannel.incomingCall,
    /** Фио */
    fio: "Иванов Иван Иванович",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 10:30").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: true,
    isUser: true,
  };

  const mockData4: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session",
    /** Идентификатор */
    id: "11111111111114",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Оператор 5",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("04.11.2025 8:55").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: false,
  };

  const mockData5: InteractionsData = {
    /** Идентификатор */
    id: "11111111111115",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
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
    createdAt: moment("12.03.2025 10:30").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: true,
    numberPhone: "8 999 333 22 11",
    statusCode: "delivered",
  };

  const mockData6: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session",
    /** Идентификатор */
    id: "11111111111116",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Группа",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("11.04.2025 8:55").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: false,
    fileSrc: true,
  };

  const mockData7: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session1",
    /** Идентификатор */
    id: "111111111111161",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Фио */
    fio: "Медси",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("11.04.2025 8:55").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: false,
  };

  const mockData8: InteractionsData = {
    /** Идентификатор сессии */
    sessionId: "session1",
    /** Идентификатор */
    id: "111111111111162",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
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
    createdAt: moment("03.12.2025 8:55").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: false,
  };

  const mockData9: InteractionsData = {
    /** Идентификатор */
    id: "111111",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Канал */
    channel: InteractionsChannel.outgoingCall,
    /** Фио */
    fio: "Иванов Иван Иванович",
    topic: "Fuuuuu",
    /** Комментарий */
    comment: "Это электронное сообщение и любые документы",
    /** Номер задачи */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата  */
    createdAt: moment("12.03.2025 10:30").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: true,
    isUser: true,
  };
  const mockData10: InteractionsData = {
    /** Идентификатор */
    id: "11111111111454",
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
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
    createdAt: moment("03.12.2025 10:30").format("DD.MM.YYYY HH:mm"),
    isViewed: false,
    isSystem: false,
    numberPhone: "8 999 333 22 11",
    statusCode: "undelivered",
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
      mockData9,
      mockData10,
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
    /** Канал */
    channel: InteractionsChannel.outgoingEmail,
    /** Статус */
    status: { value: "В работе", code: InteractionsStatus.atWork },
    /** Отправитель/получатель */
    fio: "Оператор 1",
    /** Тема */
    topic: "Это электронное сообщение и любые документы",
    /** Краткое содержание */
    comment: "",
    /** Задача */
    task: { value: "TS01010201/12", code: "fasfas" },
    /** Дата создания */
    createdAt: moment("01.01.2024 17:00").format("DD.MM.YYYY HH:mm"),
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
  window["changeTaskCallbackI"] = callback;
}

/** Тип функции обратного вызова обновления списка взаимодействий */
type GetBindInteractionCallback = () => void;
/** Функция обратного вызова обновления списка взаимодействий */
let setBindInteractionIds: GetBindInteractionCallback | undefined = undefined;
/** Установить функцию обратного вызова обновления списка взаимодействий */
function setUpdateInteractionCallback(
  callback: GetBindInteractionCallback
): void {
  (window as any).setBindInteractionIds = callback;
  setBindInteractionIds = callback;
}

//
// Для задачи
//
type ChangeRequestCallbackITask = (appealId?: string, taskId?: string) => void;
let changeRequestCallbackITask: ChangeRequestCallbackITask | undefined;
/** Установить функцию обратного вызова для изменения id обращения (Для взаимодействия с задачей) */
function setChangeRequestCallbackITask(
  callback?: ChangeRequestCallbackITask
): void {
  changeRequestCallbackITask = callback;
  window["changeRequestCallbackITask"] = callback;
}

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Получение детальных данных взаимодействия */
async function getInteractionsDetails(
  interactionId: string
): Promise<InteractionDetailsData> {
  return {
    id: "111",
    number: "VZ00000809/21",
    fioFrom: "Андреев Максим Максимович",
    email: "andreev@mail.ru",
    fioWhom: [
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
      "103@sberins.ru",
    ],
    copy: ["-"],
    createdAt: " 02.08.2025 15:00",
    status: { value: "В работе", code: InteractionsStatus.atWork },
    fileSrc: [
      {
        ...new FilesData(),
        fileDownloadURL:
          "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
        nameFiles: "file1",
      },
      {
        ...new FilesData(),
        fileDownloadURL:
          "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
        nameFiles: "file2",
      },
    ],
    group: { value: "Экстренная помощь", code: "fasfas" },
    employee: { value: "", code: "" },
    request: { value: "RQ00000809/21", code: "fasfas" },
    task: { value: " -", code: "" },
    reasonRequest: "Информация о состоянии здоровья",
    descriptionTask:
      " Информация о состоянии здоровья предоставляется пациенту лично",
    topic: "Fw: Запрос согласования",
    text: "Это электронное сообщение и любые документы, приложенные к нему, содержат конфиденциальную информацию. Настоящим уведомляем Вас о том, что если это сообщение не предназначено Вам, использование, копирование, распространение информации, содержащейся в настоящем сообщении, а также осуществление любых действий на основе этой информации, строго запрещено.",
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
      value: "Email",
      data: {
        code: InteractionsChannel.email,
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

/** Получение групп */
async function getUserGroups(userId?: string): Promise<ObjectItem[]> {
  await randomDelay();

  const authors: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Группа записи" }),
    new ObjectItem({ code: "test1", value: "Врачи кураторы МедКЦ (3 линия)" }),
    new ObjectItem({ code: "test2", value: "Операторы (дев)" }),
    new ObjectItem({ code: "test3", value: "Врачи кураторы МедКЦ (2 линия)" }),
    new ObjectItem({ code: "test4", value: "Супервайзеры (дев)" }),
    new ObjectItem({ code: "test5", value: "Экперты по претензиям (4 линия)" }),
  ];

  return authors;
}
/** Получение исполнителей */
async function getUsersInteraction(groupId?: string): Promise<ObjectItem[]> {
  await randomDelay();
  const authors: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Иванов Иван Иванович" }),
    new ObjectItem({ code: "test1", value: "Петров Петр Петрович" }),
    new ObjectItem({ code: "test2", value: "Сидоров Сидр Сидрович" }),
    new ObjectItem({ code: "test3", value: "Васильев Василий Васильевич" }),
    new ObjectItem({ code: "test4", value: "Иванов Олег Михайлович" }),
    new ObjectItem({ code: "test5", value: "Петрова Ольга Ивановна" }),
  ];
  return authors;
}

/** Сохранить группу и пользователя */
async function saveGroupExecutor(
  interactionId: string | undefined,
  group: ObjectItem | null,
  employee?: ObjectItem | null
): Promise<void> {
  // TODO
  await sleep(1000);
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
    alert("Forward on: " + interactionId + "taskId: " + taskId);
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
/** Открыть модальное окно привязки взаимодействия к задаче */
async function toggleBindInteraction(interactionId: string) {
  try {
    alert("Bind Interaction: ");
  } catch (e) {
    throw new Error("Ошибка в функции toggleBindInteraction: " + e);
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

/** Открыть окно отправки email */
function toggleSendEmail(taskId?: string) {
  alert("toggleSendEmail on: " + taskId);
}

/** Получение ссылки для перехода на страницу входящего email */
function getIcomingEmailLink(): string {
  return "";
}

/** Нажатие на кнопку "Взять в работу" */
async function setStatusAtWork(interactionId: string | undefined) {
  return;
}
/** Нажатие на кнопку "Закрыть" */
async function setStatusProcessed(interactionId: string | undefined) {
  return;
}

/** Получить количество дублей взаимодействий */
//Если дублей нет возращать просто return null, если есть то кол-во
async function getInteractionsDublicateCount(data?: InteractionDetailsData) {
  return null;
}

/** Скачать файл из внешней системы */
async function downloadFileBucket(
  url: string,
  fileName: string
): Promise<{ arrayBuffer: ArrayBuffer; contentType: string }> {
  // TODO
  const file = await fetch(url);

  return {
    arrayBuffer: await file.arrayBuffer(),
    contentType: file.headers.get("content-type") ?? "application/octet-stream",
  };
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
  getInteractionsDetails,

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
  getLines,

  setChangeRequestCallbackITask,
  setReloadInteractionsTaskCallback,
  setNewInteractionsCountTask,
  toggleSendEmail,
  toggleBindInteraction,
  setUpdateInteractionCallback,

  getUserGroups,
  getUsersInteraction,
  saveGroupExecutor,

  getIcomingEmailLink,

  setStatusAtWork,
  setStatusProcessed,

  getInteractionsDublicateCount,

  downloadFileBucket,
};
