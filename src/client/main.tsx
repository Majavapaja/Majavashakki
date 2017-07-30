import * as React from "react";
import * as ReactDOM from "react-dom";
import * as io from "socket.io-client";

import makeInitialState from '../common/initial-state';
import GameView from './gameview';
import LoginView from './LoginView';

(function() {
  const socket: SocketIOClient.Socket = io();

  ReactDOM.render(
    <LoginView socket={socket} />,
    document.querySelector("#loginAndLobby")
  )

  ReactDOM.render(
    <GameView pieces={makeInitialState()} socket={socket} />,
    document.querySelector('.game.page')
  )
})();
