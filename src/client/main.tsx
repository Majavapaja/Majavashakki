import * as React from "react";
import * as ReactDOM from "react-dom";
import * as io from "socket.io-client";

import makeInitialState from '../common/initial-state';
import App from './App';

(function() {
  const socket: SocketIOClient.Socket = io();

  ReactDOM.render(
    <App socket={socket} />,
    document.querySelector("#app")
  )
})();
