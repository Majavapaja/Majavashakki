import * as React from "react"
import * as ReactDOM from "react-dom"
import V0MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./mui-theme";
import * as io from "socket.io-client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

(() => {
  const socket: SocketIOClient.Socket = io()

  ReactDOM.render(
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <V0MuiThemeProvider>
          <App socket={socket} />
        </V0MuiThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>,
    document.querySelector("#app"),
  )
})()
