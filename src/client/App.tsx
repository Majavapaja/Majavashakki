import NavigationBar from "./NavigationBar";
import GameView from "./gameview";
import makeInitialState from "../common/initial-state";
import LoginView from "./LoginView";
import LobbyView from "./LobbyView";
import ProfileView from "./ProfileView";
import * as React from "react";
import { Route } from "react-router-dom";
import SignUpView from "./SignUpView";

export default ({ socket }) => (
  <div>
    <NavigationBar />
    <Route
      exact
      path="/login"
      component={LoginView}
    />

    <Route
      exact
      path="/signup"
      component={SignUpView}
    />

    <Route
      exact
      path="/game/:gameName"
      render={() => (
        <GameView socket={socket} />
      )}
    />

    <Route
      exact
      path="/"
      render={() => (
        <LobbyView socket={socket} />
      )}
    />

    <Route
      exact
      path="/profile"
      component={ProfileView}
    />
  </div>
);
