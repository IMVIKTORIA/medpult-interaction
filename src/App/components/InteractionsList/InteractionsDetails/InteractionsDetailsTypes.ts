import { InteractionsData } from "../../../shared/types";
import { ModalsState } from "../InteractionsListTypes";

/** Пропсы */
export interface InteractionsDetailsProps {
  /** Данные взаимодействия */
  data: InteractionsData;
  /** Перезагрузить список */
  reloadData: () => void;
  /** Идентификатор задачи */
  taskId?: string;
}

/** Данные комментария */
export interface IInteractionsCommentData {
  /** Дата */
  startDate: string;
  /** От кого */
  fio: string;
  /** Текст*/
  comment: string;
}


/** Данные Звонков */
export interface IInteractionsCallData {
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
}