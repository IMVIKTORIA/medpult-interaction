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

/** Детальные данные Взаимодействия */
export class InteractionsData {
  /** Идентификатор взаимодействия */
  id: string;
  /** Канал поступления */
  channel: InteractionsChannel;
  /** Статус взаимодействия */
  status: ObjectItem;
  /** ФИО */
  fio: string;
  /** Тема */
  topic: string;
  /** Комментарий */
  comment: string;
  /** Дата создания */
  createdAt: string;
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
  fileSrc?: boolean;
  /** Этот пользователь добавил взаимодействие */
  isUser?: boolean;
  /** Статус СМС */
  statusCode?: string;
  /** ФИО для модалки редактирования*/
  fioEdit?: string;

  constructor() {
    (this.id = ""), (this.status = { value: "", code: InteractionsStatus.new });
    this.channel = InteractionsChannel.comment;
    this.fio = "";
    this.topic = "";
    this.comment = "";
    this.createdAt = "";
    this.isViewed = false;
    this.isSystem = false;
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
  /** Email  */
  email = "email",
  /** Звонок входящий */
  incomingCall = "incomingCall",
  /** Звонок исходящий */
  outgoingCall = "outgoingCall",
  /** СМС входящее */
  incomingSms = "incomingSms",
  /** СМС исходящее */
  outgoingSms = "outgoingSms",
}

/** Статус взаимодействия */
export enum InteractionsStatus {
  /** Новое*/
  new = "new",
  /**В очереди*/
  queue = "queue",
  /**В работе */
  atWork = "atWork",
  /** Обработано */
  processed = "processed",
  /** Пропущено */
  missed = "missed",
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

export class SmsStatusData {
  /**Статус код */
  statusCode: string;
  /** Наименование статуса  */
  statusName?: string;
  /** Подстатус код */
  substatusCode?: string;
  /** Наименование подстатуса */
  substatusName?: string;

  constructor() {
    this.statusCode = "";
    this.statusName = "";
    this.substatusCode = "";
    this.substatusName = "";
  }
}

/** Данные вложений */
export class FilesData {
  /** Идентификатор файла */
  id: string;
  /** Ссылка на скачивание файла */
  fileDownloadURL: string;
  /** Название файла */
  nameFiles: string;

  constructor() {
    this.id = "";
    this.fileDownloadURL = "";
    this.nameFiles = "";
  }
}

/** Детальные данные  */
export interface IInteractionDetailsData {
  /** id */
  id: string;
  /** Дата */
  number: string;
  /** От кого */
  fioFrom: string;
  /** email */
  email: string;
  /** Кому */
  fioWhom: string[];
  /** Копия */
  copy: string[];
  /** Дата создания */
  createdAt: string;
  /** Статус взаимодействия */
  status: ObjectItem;
  /** Вложения */
  fileSrc?: FilesData[];
  /** Группа */
  group?: ObjectItem;
  /** Сотрудник */
  employee?: ObjectItem;
  /** Номер обращения */
  request?: ObjectItem;
  /** Номер задачи */
  task?: ObjectItem;
  /** Причина обращения */
  reasonRequest: string;
  /** Описание задачи */
  descriptionTask: string;
  /** Тема */
  topic: string;
  /** Текст письма */
  text: string;
  /** Входящее? */
  isIncoming: boolean
}
