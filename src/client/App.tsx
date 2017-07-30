import * as React from "react"

import makeInitialState from "../common/initial-state"
import LoginView from "./LoginView"
import GameView from "./GameView"

export default ({socket}) =>
  <ul id="app" className="pages">
    <LoginView socket={socket} />
    <GameView pieces={makeInitialState()} socket={socket} />
  </ul>
