import React from "react";
import ReactDOM from "react-dom/client";
import { ChatProvider } from "./containers/hooks/useChat";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChatProvider><App /></ChatProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();