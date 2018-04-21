import AppBar from "material-ui/AppBar";
import GameView from "./gameview";
import makeInitialState from "../common/initial-state";
import LoginView from "./LoginView";
import * as React from "react";

export default ({socket}) => (
  <div>
    <AppBar title={"Majavashakki"} />
    <LoginView socket={socket} />
    <GameView socket={socket} pieces={makeInitialState()} />
  </div>
);
