import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure Tailwind styles are loaded
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
