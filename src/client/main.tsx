import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as io from "socket.io-client";

import makeInitialState from "../common/initial-state";
import App from "./App";

(() => {
  const socket: SocketIOClient.Socket = io();

  ReactDOM.render(
    <MuiThemeProvider>
      <App socket={socket} />
    </MuiThemeProvider>,
    document.querySelector("#app"),
  );
})();
