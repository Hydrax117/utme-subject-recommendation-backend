import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { App } from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeContext from "./infrastructure/themeContex/themeContext";
import { Theme } from "./infrastructure/theme";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContext.Provider value={Theme}>
    <App />
  </ThemeContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
