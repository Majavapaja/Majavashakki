
import * as React from "react"
import * as ReactDOM from "react-dom"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./mui-theme";
import { BrowserRouter } from "react-router-dom"
import App from "./routes/App"
import Game from "./models/Game"

const game = new Game();

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App game={game} />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.querySelector("#app"),
)
