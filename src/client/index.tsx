
import * as React from "react"
import * as ReactDOM from "react-dom"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./mui-theme";
import * as io from "socket.io-client"
import { BrowserRouter } from "react-router-dom"
import App from "./routes/App"

(() => {
  const socket: SocketIOClient.Socket = io()

  ReactDOM.render(
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App socket={socket} />
      </MuiThemeProvider>
    </BrowserRouter>,
    document.querySelector("#app"),
  )
})()
