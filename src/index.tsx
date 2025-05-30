import App from "App";
import GlobalStyles from "components/GlobalStyles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "stores";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
