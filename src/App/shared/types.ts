export interface IInputData {
  value: string;
  data?: any;
}

export interface FieldConfig {
  type: "input" | "textarea";
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
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
  rowData?: any;
  /** Обработчик нажатия на строку */
  onClickRowHandler?: any;
  /** Перезагрузка списка */
  reloadData: () => void;
}

/** Детальные данные Взаимодействия */
export class InteractionsData {
  id: string;
  channel: InputDataCategory;
  fio: InputDataCategory;
  topic: InputDataCategory;
  comment: InputDataCategory;
  numberTask: InputDataCategory;
  startDate: InputDataCategory;

  constructor() {
    this.channel = new InputDataCategory();
    this.fio = new InputDataCategory();
    this.topic = new InputDataCategory();
    this.comment = new InputDataCategory();
    this.numberTask = new InputDataCategory();
    this.startDate = new InputDataCategory();
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
  /** Кому */
  fioWhom: string;
  /** Текст */
  comment: string;

  constructor() {
    this.startDate = "";
    this.fioFrom = "";
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
