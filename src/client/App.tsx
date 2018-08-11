import AppBar from "material-ui/AppBar";
import GameView from "./gameview";
import makeInitialState from "../common/initial-state";
import LoginView from "./LoginView";
import * as React from "react";
import { Route } from "react-router-dom";

export default ({socket}) => (
  <div>
    <AppBar title={"Majavashakki"} />
    <Route
      exact
      path='/'
      render={() => (
        <LoginView socket={socket} />
      )}
    />

    <Route
      exact
      path='/game'
      render={() => (
        <GameView socket={socket} pieces={makeInitialState()} />
      )}
      />
  </div>
);
