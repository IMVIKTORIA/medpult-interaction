import React, { useEffect, useState } from "react";
import Scripts from "../../shared/utils/clientScripts";
import InteractionsList from "../InteractionsList/InteractionsList";

/** Форма вкладки Взаимодействия в обращении */
export default function InteractionsForm() {
  // TODO: Id задачи
  // Идентификатор текущего обращения
  const [taskId, setTaskId] = useState<string>(/** "test"*/);

  // Запись callback изменения задачи
  React.useLayoutEffect(() => {
    if (taskId == "test") alert("Форма в режиме разработки");
    const changeTaskCallback = (taskId?: string) => setTaskId(taskId);
    Scripts.setChangeTaskCallbackT(changeTaskCallback);

    return () => Scripts.setChangeTaskCallbackT();
  }, []);
  return (
    taskId && (
      <div className="interaction-form">
        <InteractionsList taskId={taskId} />
      </div>
    )
  );
}
