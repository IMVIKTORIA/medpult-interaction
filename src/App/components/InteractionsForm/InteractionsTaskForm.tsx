import React, { useEffect, useState } from "react";
import Scripts from "../../shared/utils/clientScripts";
import InteractionsList from "../InteractionsList/InteractionsList";

/** Форма вкладки Взаимодействия в задаче */
export default function InteractionsTaskForm() {
  // Идентификатор текущего обращения
  const [appealId, setAppealId] = useState<string>(/*"test"*/);
  const [taskId, setTaskId] = useState<string>(/*"test"*/);

  // Запись callback изменения задачи
  React.useLayoutEffect(() => {
    if (appealId == "test" && taskId == "test") alert("Форма в режиме разработки (задача)");

    const changeTaskCallback = (appealId?: string, taskId?: string) => {
      setAppealId(appealId)
      setTaskId(taskId)
    }

    Scripts.setChangeRequestCallbackITask(changeTaskCallback);

    return () => Scripts.setChangeRequestCallbackITask();
  }, []);

  return (
    appealId && taskId && (
      <div className="interaction-form">
        <InteractionsList appealId={appealId} taskId={taskId}/>
      </div>
    )
  );
}
