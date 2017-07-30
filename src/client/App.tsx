import GameView from "./gameview";
import makeInitialState from "../common/initial-state";
import LoginView from "./LoginView";
import * as React from "react";

export default ({socket}) =>
  (
    <ul id="app" className="pages">
      <LoginView socket={socket} />
      <GameView pieces={makeInitialState()} socket={socket} />
    </ul>
  );
