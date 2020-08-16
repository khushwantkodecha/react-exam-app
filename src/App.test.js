import React from "react";


import ReactDom from "react-dom";
import App from "./App";

it("Rendering without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<App></App>, div);
  ReactDom.unmountComponentAtNode(div);
});
