import React, { useState } from "react";

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