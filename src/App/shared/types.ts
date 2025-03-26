import { ObjectItem } from "../../UIKit/Filters/FiltersTypes";

export interface IInputData {
  value: string;
  data?: any;
}

/** Тип поля */
export enum FieldType {
  /** Поле ввода */
  input = "input",
  /** Текстовое поле */
  textarea = "textarea",
  /** Выпадающий список линий */
  lineDropdown = "lineDropdown",
}

export interface FieldConfig {
  type: FieldType;
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  maskFunction?: (value: string) => string;
}
/** Данные столбца таблицы */
export class ListColumnData {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Можно ли по этому столбцу сортировать */
  isSortable: boolean;
  /** Хранит ли по столбец ссылки */
  isLink: boolean;
  /** Название столбца */
  name: string;
  /** Код значения */
  code: string;
  /** Обработчик нажатия */
  onClick?: (props: any) => any;
  /** Хранит ли по столбец иконку */
  isIcon?: boolean;

  constructor({
    name,
    code,
    fr,
    isSortable,
    isLink,
    onClick,
    isIcon,
  }: {
    name: string;
    code: string;
    fr?: number;
    isSortable?: boolean;
    isLink?: boolean;
    onClick?: (props: any) => any;
    isIcon?: boolean;
  }) {
    this.fr = fr ?? 1;
    this.isSortable = isSortable ?? false;
    this.isLink = isLink ?? false;
    this.isIcon = isIcon ?? false;

    if (onClick) this.onClick = onClick;

    this.name = name;
    this.code = code;
  }
}

export interface CustomInputProps extends React.ComponentProps<"input"> {
  values: { [key: string]: any };
  name: string;
  buttons?: any;
  inputHandler?: (name: string, value: any) => void;
  clickHandler?: (ev) => void;
  cursor?: string;
  isOpen?: boolean;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  readOnly?: boolean;
  isViewMode?: boolean;
  placeholder?: string;
  maskFunction?: (value: string) => string;
  getValueHandler?: (props: CustomInputProps) => string;
  isInvalid?: boolean;
  customClassname?: string;
}

/** Значение поля ввода типа Категория */
export class InputDataCategory implements IInputData {
  value: string;
  data: {
    code: string;
  };

  constructor(value?: string, code?: string) {
    this.value = value ?? "";
    this.data = { code: code ?? "" };
  }
}

/** Данные сортировки */
export class SortData {
  code: string;
  isAscending: boolean;

  constructor({ code, isAscending }: { code?: string; isAscending?: boolean }) {
    this.code = code ?? "";
    this.isAscending = isAscending ?? true;
  }
}

export interface DetailsProps {
  data: any;
  values: any;
}

export interface AdditionalInfo {
  value: string;
  info: string;
}

/** Атрибуты функции получения разметки деталей строки динамического списка */
export interface getDetailsLayoutAttributes {
  /** Сокращенные данные строки */
  rowData: InteractionsData;
  /** Обработчик нажатия на строку */
  onClickRowHandler?: any;
  /** Перезагрузка списка */
  reloadData: () => void;
}

/** Тип сгруппированных данных */
export enum GroupType {
  /** Цепочка писем */
  email = "email",
  /** По-умолчанию (Одно взаимодействие в группе) */
  default = "default",
}

/** Сгруппированные данные по взаимодействиям */
export class GroupData {
  /** Взаимодействие (Первое взаимодействие для цепочек писем) */
  interaction: InteractionsData;
  /** Тип сгруппированных данных */
  groupType: GroupType;
  /** Идентификатор сессии */
  sessionId?: string;
  /** Взаимодействия в цепочке писем */
  interactions?: InteractionsData[];
}

// /** Детальные данные Взаимодействия */
// export class InteractionsData {
//   /** Идентификатор взаимодействия */
//   id: string;
//   /** Канал поступления */
//   channel: InputDataCategory;
//   /** ФИО */
//   fio: InputDataCategory;
//   /** Тема */
//   topic: InputDataCategory;
//   /** Комментарий */
//   comment: InputDataCategory;
//   /** Номер задачи */
//   numberTask: InputDataCategory;
//   /** Дата создания */
//   startDate: InputDataCategory;
//   /** Просмотрено? */
//   isViewed: boolean

//   constructor() {
//     this.channel = new InputDataCategory();
//     this.fio = new InputDataCategory();
//     this.topic = new InputDataCategory();
//     this.comment = new InputDataCategory();
//     this.numberTask = new InputDataCategory();
//     this.startDate = new InputDataCategory();
//     this.isViewed = false;
//   }
// }

/** Детальные данные Взаимодействия */
export class InteractionsData {
  /** Идентификатор взаимодействия */
  id: string;
  /** Канал поступления */
  channel: InteractionsChannel;
  /** ФИО */
  fio: string;
  /** Тема */
  topic: string;
  /** Комментарий */
  comment: string;
  /** Дата создания */
  createdAt: Date;
  /** Просмотрено? */
  isViewed: boolean;
  /** Cистема создала? */
  isSystem: boolean;
  /** Номер задачи */
  task?: ObjectItem;
  /** Идентификатор сессии */
  sessionId?: string;
  /** Номер телефона */
  numberPhone?: string;
  /** для email */
  logChan?: string;
  /** Файл для email */
  fileSrc?: string;
  /** Этот пользователь добавил взаимодействие */
  isUser?: boolean;

  constructor() {
    this.channel = InteractionsChannel.comment;
    this.fio = "";
    this.topic = "";
    this.comment = "";
    this.createdAt = new Date();
    this.isViewed = false;
    this.isSystem = false;
  }
}

/** Данные проекта письма */
export class InteractionsEmailData {
  /** Дата */
  startDate: string;
  /** От кого */
  fioFrom: string;
  /** Кому */
  fioWhom: string;
  /** Отдел */
  departament?: string;
  /** email */
  email?: string;
  /** Копия */
  copy: string;
  /** Тема */
  topic: string;
  /** Вложения */
  fileSrc: string;
  /** Текст письма */
  text: string;

  constructor() {
    this.startDate = "";
    this.fioFrom = "";
    this.fioWhom = "";
    this.departament = "";
    this.email = "";
    this.copy = "";
    this.topic = "";
    this.fileSrc = "";
    this.text = "";
  }
}

/** Данные комментария */
export class InteractionsCommentData {
  /** Дата */
  startDate: string;
  /** От кого */
  fio: string;
  /** Текст*/
  comment: string;

  constructor() {
    this.startDate = "";
    this.fio = "";
    this.comment = "";
  }
}

/** Данные Звонков */
export class InteractionsCallData {
  /** Дата */
  startDate: string;
  /** От кого */
  fioFrom: string;
  /** Отдел */
  departament?: string;
  /** Телефон */
  phone?: string;
  /** Кому */
  fioWhom: string;
  /** Текст */
  comment: string;

  constructor() {
    this.startDate = "";
    this.fioFrom = "";
    this.departament = "";
    this.phone = "";
    this.fioWhom = "";
    this.comment = "";
  }
}

/** интерфейс для возвращаемого значения функции */
export interface GetInteractionsResponse {
  data: InteractionsData[];
  hasMore: boolean;
}

export enum ButtonType {
  outline = "outline",
}

/** Канал обращения */
export enum InteractionsChannel {
  /** Все*/
  allChannel = "allChannel",
  /** Комментарии*/
  comment = "comment",
  /** Email входящий */
  incomingEmail = "incomingEmail",
  /** Email исходящий */
  outgoingEmail = "outgoingEmail",
  /** Звонок входящий */
  incomingCall = "incomingCall",
  /** Звонок исходящий */
  outgoingCall = "outgoingCall",
  /** СМС входящее */
  incomingSms = "incomingSms",
  /** СМС исходящее */
  outgoingSms = "outgoingSms",
}

/** Данные строки взаимодействий */
export interface InteractionsRowData {
  id: string;
  channel: InputDataCategory;
  topic: InputDataCategory;
  fio: InputDataCategory;
  comment: InputDataCategory;
  numberTask: InputDataCategory;
  startDate: InputDataCategory;
}

export interface TabProps {
  handler: any;
  values: InteractionsRowData;
}
