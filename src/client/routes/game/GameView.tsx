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
import PlayerBadge from "./PlayerBadge"
import * as Majavashakki from "../../../common/GamePieces"

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
      <div className={classes.gameContainer}>
        {game.winner && <EndScreen />}
        <div className={classes.playArea}>
          <PlayerBadge color={Majavashakki.PieceColor.White} />
          <Board />
          <PlayerBadge color={Majavashakki.PieceColor.Black} />
        </div>
        <MessagePanel {...messageProps} />
      </div>
    )
  }
}

const styles = (theme: Theme) => createStyles({
  gameContainer: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    padding: 20,
  },
  playArea: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px",
  },
})

interface IGameViewProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  game: GameStore;
}

export default withStyles(styles)(withRouter(GameView));
