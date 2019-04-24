import NavigationBar from "../common/NavigationBar";
import GameView from "./game/GameView";
import LoginView from "./login/LoginView";
import LobbyView from "./lobby/LobbyView";
import ProfileView from "./profile/ProfileView";
import * as React from "react";
import { Route } from "react-router-dom";
import SignUpView from "./signup/SignUpView";
import NotificationView from "../common/NotificationView";
import PromotionDialog from "../common/PromotionDialog";

export default class App extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <NotificationView />
        <NavigationBar />
        <PromotionDialog />

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
          path="/game/:gameId"
          component={GameView}
        />

        <Route
          exact
          path="/"
          component={LobbyView}
        />

        <Route
          exact
          path="/profile"
          component={ProfileView}
        />
      </div>
  )}
};