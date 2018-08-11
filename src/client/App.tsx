import AppBar from "material-ui/AppBar";
import GameView from "./gameview";
import makeInitialState from "../common/initial-state";
import LoginView from "./LoginView";
import LobbyView from "./LobbyView";
import ProfileView from "./ProfileView";
import * as React from "react";
import { Route } from "react-router-dom";

export default ({ socket }) => (
  <div>
    <AppBar title={"Majavashakki"} />
    <Route
      exact
      path='/login'
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

    <Route
      exact
      path='/'
      render={() => (
        <LobbyView socket={socket} />
      )}
    />

    <Route
      exact
      path='/profile'
      render={() => (
        <ProfileView socket={socket} />
      )}
    />
  </div>
);
