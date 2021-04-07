import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Converter from "./Converter";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Converter />
  </StrictMode>,
  rootElement
);
