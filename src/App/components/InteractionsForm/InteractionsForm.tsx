import React, { useEffect, useState } from "react";
import { InteractionsData, InputDataCategory } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import InteractionsList from "../InteractionsList/InteractionsList";

/** Форма вкладки Взаимодействия в обращении */
export default function InteractionsForm() {
  const [isViewMode, setIsViewMode] = useState<boolean>(true);

  // Идентификатор текущего обращения
  const [appealId, setAppealId] = useState<string>("test");
  // Данные выбранного гарантийного письма
  const [selectedForma, setSelectedForma] = useState<InputDataCategory | null>(
    null
  );
  // Для хранения списка
  const [interactionsData, setInteractionsData] = useState<InteractionsData[]>(
    []
  );
  // Количество взаимодействий
  const [elementsCount, setElementsCount] = useState<number>(0);
  const fetchElementsCount = async () => {
    const count = await Scripts.getInteractionsCount();
    setElementsCount(count);
  };

  // Сохраняем данные в состояние
  const fetchInteractionsData = async () => {
    if (!appealId) return;
    const response = await Scripts.getInteractions(appealId);
    setInteractionsData(response.data);
  };

  // Интервал для проверки количества взаимодействий
  useEffect(() => {
    if(!appealId) return;

    const interval = setInterval(async () => {
      const newCount = await Scripts.getInteractionsCount();
      if (newCount !== elementsCount) {
        setElementsCount(newCount);
        fetchInteractionsData(); // Обновляем список взаимодействий, если количество изменилось
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [appealId]);

  // Инициализация количества взаимодействий при монтировании компонента
  useEffect(() => {
    fetchElementsCount();
  }, []);

  const handleRowClick = (forma?: InputDataCategory) => {
    if (!forma) {
      setSelectedForma(null);
      return;
    }
    setSelectedForma(forma);
  };

  // Запись callback изменения задачи
  React.useLayoutEffect(() => {
    const changeTaskCallback = (appealId?: string) => setAppealId(appealId);
    Scripts.setChangeTaskCallbackI(changeTaskCallback);

    return () => Scripts.setChangeTaskCallbackI();
  }, []);

  // При изменении appealId
  useEffect(() => {
    if (!appealId) return;
    fetchInteractionsData();
  }, [appealId]);

  return (
    appealId && (
      <div className="interaction-form">
        <InteractionsList
          appealId={appealId}
          handler={() => {}}
          isViewMode={isViewMode}
          saveStateHandler={() => {}}
          setSelectedForma={setSelectedForma}
          onRowClick={handleRowClick}
        />
      </div>
    )
  );
}
