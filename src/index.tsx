import { StrictMode, Suspense } from "react";
import { render } from "react-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Store } from "context/context";
import { Theme } from "theme";
import App from "./App";
import LoadingGlobal from "components/loading-global";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import "./css/index.css";

render(
  <StrictMode>
    <Store>
      <Theme>
        <Suspense fallback={<LoadingGlobal />}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </Suspense>
      </Theme>
    </Store>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
