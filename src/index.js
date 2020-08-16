import React from "react";
//ReactDOM for rendering the component
import ReactDOM from "react-dom";
//importing main file of the task that is App.js
import App from "./App";
//using bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//rendering App component to root id elemt of main html file
ReactDOM.render(<App />, document.getElementById("root"));
