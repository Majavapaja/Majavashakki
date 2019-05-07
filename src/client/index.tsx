
import * as React from "react"
import * as ReactDOM from "react-dom"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import theme from "./mui-theme"
import { BrowserRouter } from "react-router-dom"
import App from "./routes/App"
import AppStore from "./store/AppStore"
import { Provider } from "mobx-react"
import { create } from "jss"
import { JssProvider } from "react-jss"
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles"
import jssGlobal from "jss-global"

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
}).use(jssGlobal)

const app = new AppStore()

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider app={app}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </JssProvider>,
  document.querySelector("#app"),
)
