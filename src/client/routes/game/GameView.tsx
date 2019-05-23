import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles"
import Board from "./Board"
import { observer, inject } from "mobx-react"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Typography } from "@material-ui/core"
import {IAppStore} from "../../store/AppStore"
import GameStore from "../../store/GameStore"
import {ApiPlayerDetails} from "../../../common/types"
import SidePanel from "./SidePanel"
import EndScreen from "./EndScreen"
import MessagePanel from "./MessagePanel"
import Players from "./Players"

@inject((stores: IAppStore) => ({game: stores.app.game}))
@observer
class GameView extends React.Component<IGameViewProps, any> {
  constructor(props: IGameViewProps) {
    super(props)
  }

  public async componentDidMount() {
    const {game, match} = this.props
    await game.loadGame(match.params.gameId)
    game.connectSocket()
  }

  public render() {
    const { classes, game } = this.props
    if (game.isLoading) {
      return <div>Loading...</div>
    }

    let messageProps

    if (game.winner) messageProps = { message: `Winner is: ${game.winner}!`}
    else if (game.error) messageProps = { message: game.error, type: "error" }
    else if (game.isCheck) messageProps = { message: "Check!", type: "info" }

    return (
      <Paper className={classes.gameContainer}>
        {game.winner && <EndScreen />}
        <div className={classes.leftContainer}>
          <Players />
          <Board />
          <MessagePanel {...messageProps} />
        </div>
        <div className={classes.rightContainer}>
          <SidePanel />
        </div>
      </Paper>
    )
  }
}

const styles = (theme: Theme) => createStyles({
  gameContainer: {
    display: "flex",
    alignSelf: "center",
    padding: 20,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    width: "60vmin",
  },
  rightContainer: {
    display: "flex",
    width: "20vmin",
  },
})

interface IGameViewProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  game: GameStore;
}

export default withStyles(styles)(withRouter(GameView));
