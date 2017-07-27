import * as React from "React";
import * as ReactDOM from "React-DOM";
import * as io from "socket.io-client";

import INITIAL_STATE from '../common/initial-state';
import GameView from './gameview';
import LoginView from './LoginView';

(function() {
  const socket: SocketIOClient.Socket = io();

  ReactDOM.render(
    <LoginView  socket={socket} />,
    document.querySelector("#loginAndLobby")
  )

  ReactDOM.render(
    <GameView pieces={INITIAL_STATE} socket={socket} />,
    document.querySelector('.game.page')
  )
})();
