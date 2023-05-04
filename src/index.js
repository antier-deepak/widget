import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("widget"));

window.ReactCounter = {
  mount: (props) => {
    const el = document.getElementById("widget");
    const root = ReactDOM.createRoot(el);
    root.render(<App {...props} />, el);
  },
  unmount: () => {
    const el = document.getElementById("widget");
    ReactDOM.unmountComponentAtNode(el);
  },
};

// Find all widget divs
// const widgetDiv = ReactDOM.createRoot(document.getElementById(".dummy-widget"));
// console.log("widget running!");
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
