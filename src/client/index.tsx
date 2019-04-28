
import * as React from "react"
import * as ReactDOM from "react-dom"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./mui-theme";
import { BrowserRouter } from "react-router-dom"
import App from "./routes/App"
import AppStore from "./store/AppStore";
import { Provider } from "mobx-react";

const app = new AppStore();

ReactDOM.render(
  <Provider app={app}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#app"),
)
