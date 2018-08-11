import * as React from "react"
import * as ReactDOM from "react-dom"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import * as io from "socket.io-client"
import { BrowserRouter } from 'react-router-dom'
import App from "./App"

(() => {
  const socket: SocketIOClient.Socket = io()

  ReactDOM.render(
    <BrowserRouter>
      <MuiThemeProvider>
        <App socket={socket} />
      </MuiThemeProvider>
    </BrowserRouter>,
    document.querySelector("#app"),
  )
})()
