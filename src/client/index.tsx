import * as React from "react"
import * as ReactDOM from "react-dom"
import theme from "./mui-theme"
import { BrowserRouter } from "react-router-dom"
import App from "./routes/App"
import AppStore from "./store/AppStore"
import { Provider } from "mobx-react"
import { create } from "jss"
import { JssProvider } from "react-jss"
import { createGenerateClassName, jssPreset, MuiThemeProvider } from "@material-ui/core/styles"
import jssGlobal from "jss-global"

const generateClassName = createGenerateClassName({ productionPrefix: "Majavashakki" })
const jss = create({ ...jssPreset() }).use(jssGlobal)

const app = new AppStore()

ReactDOM.render(
  <JssProvider jss={jss} generateId={generateClassName}>
    <Provider app={app} game={app.game}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </JssProvider>,
  document.querySelector("#app")
)
