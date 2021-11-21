import NavigationBar from "../common/NavigationBar"
import GameView from "./game/GameView"
import LoginView from "./login/LoginView"
import LobbyView from "./lobby/LobbyView"
import ProfileView from "./profile/ProfileView"
import * as React from "react"
import { Route } from "react-router-dom"
import SignUpView from "./signup/SignUpView"
import NotificationView from "../common/NotificationView"
import PromotionDialog from "./game/PromotionDialog"
import { withStyles, createStyles, WithStyles } from "@material-ui/core"
import background from "../assets/bg1.svg"

class App extends React.Component<IAppProps, any> {
  public render() {
    return (
      <div className={this.props.classes.root}>
        <NotificationView />
        <NavigationBar />
        <PromotionDialog />

        <Route exact path="/login" component={LoginView} />

        <Route exact path="/signup" component={SignUpView} />

        <Route exact path="/game/:gameId" component={GameView} />

        <Route exact path="/" component={LobbyView} />

        <Route exact path="/profile" component={ProfileView} />
      </div>
    )
  }
}

interface IAppProps extends WithStyles<typeof styles> {}

const styles = () =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    "@global": {
      html: {
        "-webkit-font-smoothing": "antialiased",
        background: `no-repeat fixed url(${background})`,
        "background-size": "cover",
      },
      body: {
        margin: 0,
      },
    },
  })

export default withStyles(styles)(App)
