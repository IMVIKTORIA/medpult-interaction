import React, { useEffect, useState } from "react";
import Scripts from "../../shared/utils/clientScripts";
import InteractionsList from "../InteractionsList/InteractionsList";

/** Форма вкладки Взаимодействия в обращении */
export default function InteractionsForm() {
  // Идентификатор текущего обращения
  const [appealId, setAppealId] = useState<string>(/* "test" */);

  // Запись callback изменения задачи
  React.useLayoutEffect(() => {
    if (appealId == "test") alert("Форма в режиме разработки");
    const changeTaskCallback = (appealId?: string) => setAppealId(appealId);
    Scripts.setChangeTaskCallbackI(changeTaskCallback);

    return () => Scripts.setChangeTaskCallbackI();
  }, []);

  return (
    appealId && (
      <div className="interaction-form">
        <InteractionsList appealId={appealId} />
      </div>
    )
  );
}
