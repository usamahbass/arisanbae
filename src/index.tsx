import { Store } from "context/context";
import { StrictMode } from "react";
import { render } from "react-dom";
import { Theme } from "theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

render(
  <StrictMode>
    <Theme>
      <Store>
        <App />
      </Store>
    </Theme>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
