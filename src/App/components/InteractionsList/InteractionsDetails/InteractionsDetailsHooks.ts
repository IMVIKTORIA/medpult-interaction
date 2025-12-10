import React, { useEffect, useState } from "react";
import { InteractionsData } from "../../../shared/types";
import Scripts from "../../../shared/utils/clientScripts";
import { ModalsState } from "../InteractionsListTypes";
import { useModalStates } from "../InteractionsListHooks";

export function useDetailsForm<DetailsDataType = any>(interactionId: string, getDetailsDataHandler: (interactionId: string) => Promise<DetailsDataType>) {
  // Флаг загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Детальные данные взаимодействия
  const [interactionsDetailsData, setInteractionsDetailsData] = useState<DetailsDataType>();

  // Получить детальные данные взаимодействия
  const fetchInteractionsDetails = async () => {
    setIsLoading(true);
    const detailsData = await getDetailsDataHandler(interactionId);
    setInteractionsDetailsData(detailsData);
    setIsLoading(false);
  };

  // Перезагрузить данные формы
  const reloadFulldata = () => {
    fetchInteractionsDetails();
  };

  // Изначальная загрузка данных
  React.useLayoutEffect(() => {
    reloadFulldata();
  }, []);

  return {
    isLoading,
    interactionsDetailsData,
    fetchInteractionsDetails,
  }
}

export function useDetailsFormHandlers(data: InteractionsData, reloadData: () => void) {
  /** Показывать кнопки удаления и редактирования? */
  const checkCanShowEditButton = (): boolean => {
    // Не показывать для автоматического
    if (data.isSystem) return false;
    // Не показывать если не автор
    if (!data.isUser) return false;

    return Scripts.checkCanShowEditButtonByTime(data.createdAt);
  };

  /** Показывать кнопки изменения и удаления? */
  const [isShowEditButtons, setIsShowEditButtons] = useState<boolean>(checkCanShowEditButton);

  /** При отрисовке поставить таймер чтобы скрыть кнопки динамически */
  useEffect(() => {
    // Если кнопки не показаны, то не весить таймер
    if (!checkCanShowEditButton()) return;

    // Разница между текущей датой и 60 минут после создания
    const duration = Scripts.getHideButtonsTimerDuration(data.createdAt);

    // Таймер для обновления отображения кнопок
    const timeout = setTimeout(() => {
      setIsShowEditButtons(checkCanShowEditButton());
    }, duration);

    // Удалить таймер при закрытии
    return () => clearTimeout(timeout);
  }, []);

  // Вспомогательная функция для показа ошибок
  const showErrorMessage = (message: string) => {
    if ((window as any).showError) (window as any).showError(message);
  };

  /** Проверить можно ли изменять взаимодействие, и показать ошибку если нельзя */
  function checkCanEdit() {
    if (data.isSystem) {
      showErrorMessage(
        "Изменение невозможно, взаимодействие добавлено автоматически"
      );
      return false;
    }

    if (!data.isUser) {
      showErrorMessage(
        "Изменение запрещено, взаимодействие внес другой пользователь"
      );
      return false;
    }

    if (!isShowEditButtons) {
      showErrorMessage("Изменение невозможно, прошло более 60 минут");
      return false;
    }

    return true;
  }

  /** Проверить можно ли удалять взаимодействие, и показать ошибку если нельзя */
  function checkCanDelete() {
    if (data.isSystem) {
      showErrorMessage(
        "Удаление невозможно, взаимодействие добавлено автоматически"
      );
      return false;
    }

    if (!data.isUser) {
      showErrorMessage(
        "Удаление запрещено, взаимодействие внес другой пользователь"
      );
      return false;
    }

    if (!isShowEditButtons) {
      showErrorMessage("Удаление невозможно, прошло более 60 минут");
      return false;
    }

    return true;
  }

  const handleRemoveClick = async () => {
    const canDelete = checkCanDelete();
    if (!canDelete) return;

    await Scripts.deleteInteraction(data.id);
    reloadData();
  };

  const {modalStates} = useModalStates();

  /** Закрыть модальное окно */
  const closeModal = () => {
    modalStates.setIsShowCommentModal(false);
    modalStates.setIsShowCallInModal(false);
    modalStates.setIsShowCallOutModal(false);
    modalStates.setIsShowSmsInModal(false);
    modalStates.setIsShowSmsOutModal(false);
    modalStates.setIsShowEmailInModal(false);
    modalStates.setIsShowEmailOutModal(false);
  };


  return {
    handleRemoveClick,
    checkCanEdit,
    isShowEditButtons,
    modalStates,
    closeModal,
  }
}