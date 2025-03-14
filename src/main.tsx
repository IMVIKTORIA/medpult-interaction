import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";

// Рендер приложений
ReactDOM.createRoot(
  // document.querySelector("#interaction-root") as HTMLElement // Для обращения
  document.querySelector("#interaction-task-root") as HTMLElement // Для задач
).render(<App />);