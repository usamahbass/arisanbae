import { StrictMode, Suspense } from "react";
import { render } from "react-dom";
import { Store } from "context/context";
import { Theme } from "theme";
import App from "./App";
import LoadingGlobal from "components/loading-global";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import "./css/index.css";

render(
  <StrictMode>
    <Theme>
      <Store>
        <Suspense fallback={<LoadingGlobal />}>
          <App />
        </Suspense>
      </Store>
    </Theme>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
