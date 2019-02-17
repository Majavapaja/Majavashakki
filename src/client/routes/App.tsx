import NavigationBar from "../common/NavigationBar";
import Snackbar from "@material-ui/core/Snackbar";
import GameView from "./game/GameView";
import LoginView from "./login/LoginView";
import LobbyView from "./lobby/LobbyView";
import ProfileView from "./profile/ProfileView";
import * as React from "react";
import { Route } from "react-router-dom";
import SignUpView from "./signup/SignUpView";
import { inject, observer } from "mobx-react";
import {IAppStore} from "../models/AppContainer"
import ApiService from "client/common/ApiService";

@inject((stores: IAppStore) => ({api: stores.app.api}))
@observer
export default class App extends React.Component<IAppProps, any> {

  public render() {
    return (
      <div>
        {console.log(this.props)}
        <Snackbar
          open={this.props.api.error.show}
          autoHideDuration={4000}
          message={this.props.api.error.message}
          onClose={this.props.api.error.close}
        />
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

interface IAppProps {
  api: ApiService;
}