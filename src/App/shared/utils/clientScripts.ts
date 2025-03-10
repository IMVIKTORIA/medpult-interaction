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
  appealId: string
): Promise<GetInteractionsResponse> {
  const mockData: InteractionsData = {
    /** Идентификатор */
    id: appealId,
    /** Канал */
    channel: new InputDataCategory("", InteractionsChannel.outgoingEmail),
    /** Фио */
    fio: new InputDataCategory("Оператор 1", "111"),
    topic: new InputDataCategory("Fuuuuuu", "111"),
    /** Комментарий */
    comment: new InputDataCategory(
      "Это электронное сообщение и любые документы"
    ),
    /** Номер задачи */
    numberTask: new InputDataCategory("TS000025/24", "forma_code"),
    /** Дата  */
    startDate: new InputDataCategory("10.03.2025 8:41"),
    isViewed: true
  };

  const mockData1: InteractionsData = {
    /** Идентификатор */
    id: "1111111111111",
    /** Канал */
    channel: new InputDataCategory("", InteractionsChannel.incomingEmail),
    /** Фио */
    fio: new InputDataCategory("Оператор 1", "111"),
    topic: new InputDataCategory("", "111"),
    /** Комментарий */
    comment: new InputDataCategory(
      "Это электронное сообщение и любые документы"
    ),
    /** Номер задачи */
    numberTask: new InputDataCategory("TS000025/24", "forma_code"),
    /** Дата  */
    startDate: new InputDataCategory("01.01.2024 17:00"),
    isViewed: false
  };

  const mockData2: InteractionsData = {
    /** Идентификатор */
    id: "11111111111112",
    /** Канал */
    channel: new InputDataCategory("", InteractionsChannel.comment),
    /** Фио */
    fio: new InputDataCategory("Оператор 1", "111"),
    topic: new InputDataCategory("", "111"),
    /** Комментарий */
    comment: new InputDataCategory(
      "Это электронное сообщение и любые документы"
    ),
    /** Номер задачи */
    numberTask: new InputDataCategory("TS000025/24", "forma_code"),
    /** Дата  */
    startDate: new InputDataCategory("01.01.2024 17:00"),
    isViewed: false
  };

  const mockData3: InteractionsData = {
    /** Идентификатор */
    id: "11111111111113",
    /** Канал */
    channel: new InputDataCategory("", InteractionsChannel.outgoingCall),
    /** Фио */
    fio: new InputDataCategory("Оператор 1", "111"),
    topic: new InputDataCategory("", "111"),
    /** Комментарий */
    comment: new InputDataCategory(
      "Это электронное сообщение и любые документы"
    ),
    /** Номер задачи */
    numberTask: new InputDataCategory("TS000025/24", "forma_code"),
    /** Дата  */
    startDate: new InputDataCategory("01.01.2024 17:00"),
    isViewed: false
  };

  const mockData4: InteractionsData = {
    /** Идентификатор */
    id: "11111111111114",
    /** Канал */
    channel: new InputDataCategory("", InteractionsChannel.outgoingEmail),
    /** Фио */
    fio: new InputDataCategory("Оператор 1", "111"),
    topic: new InputDataCategory("", "111"),
    /** Комментарий */
    comment: new InputDataCategory(
      "Это электронное сообщение и любые документы"
    ),
    /** Номер задачи */
    numberTask: new InputDataCategory("TS000025/24", "forma_code"),
    /** Дата  */
    startDate: new InputDataCategory("01.01.2024 17:00"),
    isViewed: false
  };

  const mockData5: InteractionsData = {
    /** Идентификатор */
    id: "11111111111115",
    /** Канал */
    channel: new InputDataCategory("", InteractionsChannel.incomingSms),
    /** Фио */
    fio: new InputDataCategory("Оператор 1", "111"),
    topic: new InputDataCategory("", "111"),
    /** Комментарий */
    comment: new InputDataCategory(
      "Это электронное сообщение и любые документы"
    ),
    /** Номер задачи */
    numberTask: new InputDataCategory("TS000025/24", "forma_code"),
    /** Дата  */
    startDate: new InputDataCategory("01.01.2024 17:00"),
    isViewed: false
  };

  await randomDelay();
  return {
    data: [mockData, mockData1, mockData2, mockData3, mockData4, mockData5],
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
    channel: new InputDataCategory("", InteractionsChannel.outgoingEmail),
    /** Согласованные услуги */
    fio: new InputDataCategory("Оператор 1", "111"),
    topic: new InputDataCategory("Fuuuuuu", "111"),
    /** Срок действия */
    comment: new InputDataCategory(
      "Это электронное сообщение и любые документы"
    ),
    /** Дата отзыва */
    numberTask: new InputDataCategory("TS000025/24", "forma_code"),
    /** Задача на отзыв */
    startDate: new InputDataCategory("01.01.2024 17:00"),
    isViewed: false
  };

  await randomDelay();
  return mockData;
}

type SetVisibilityCallbackI = (appealId?: string) => void;
let changeTaskCallbackI: SetVisibilityCallbackI | undefined;

/** Установить функцию обратного вызова для изменения id задачи */
function setChangeTaskCallbackI(callback?: SetVisibilityCallbackI): void {
  changeTaskCallbackI = callback;
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
    startDate: "06.06.2024 17:00",
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
    startDate: "06.06.2024 17:00",
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
    fioFrom: "Оператор 1",
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
    fioFrom: "Оператор 2",
    fioWhom: "Медси",
    comment:
      "Это электронное сообщение и любые документы, приложенные к нему, содержат конфиденциальную информацию. Настоящим уведомляем Вас о том, что если это сообщение не предназначено Вам, использование, копирование, распространение информации, содержащейся в настоящем сообщении, а также осуществление любых действий на основе этой информации, строго запрещено.",
  };
}

/** Добавить Взаимодейсвтие "комментарий" */
async function addCommentChannel(
  interactionId: string | undefined,
  text: string
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
  interactionId?: string
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
  interactionId?: string
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
  interactionId?: string
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
async function getInteractionsCount(): Promise<number> {
  return 5;
}

/** Открыть модальное окно для отправки ответа на email */
async function toggleSendEmailAnswer(interactionId: string) {
  try {
    alert("Send Answer on: " + interactionId);
  } catch (e) {
    throw new Error("Ошибка в функции toggleSendEmailAnswer: " + e);
  }
}

/** Открыть модальное окно для отправки ответа на email */
async function toggleSendEmailForward(interactionId: string) {
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
    console.log("setNewInteractionsCountRequest: ", count)
  }

  /** Обновить флажок Просмотрено у взаимодействия */
  async function updateIsInteractionViewed(interactionId: string): Promise<void> {
    // TODO
  }

  /** Получение списка Линий */
  async function getLines(): Promise<{code: string, name: string}[]> {
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
  getLines
};
