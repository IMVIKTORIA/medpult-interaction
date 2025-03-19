import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import InteractionsTaskForm from "./App/components/InteractionsForm/InteractionsTaskForm";
import InteractionsForm from "./App/components/InteractionsForm/InteractionsForm";

// Рендер приложений
// ReactDOM.createRoot(
//   // document.querySelector("#interaction-root") as HTMLElement // Для обращения
//   document.querySelector("#interaction-task-root") as HTMLElement // Для задач
// ).render(<App />);

ReactDOM.createRoot(
  document.querySelector("#interaction-task-root") as HTMLElement // Для задач
).render(<InteractionsTaskForm />);

ReactDOM.createRoot(
  document.querySelector("#interaction-root") as HTMLElement // Для обращения
).render(<InteractionsForm />);