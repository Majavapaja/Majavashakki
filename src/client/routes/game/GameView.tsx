import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles"
import Board from "./Board"
import { observer, inject } from "mobx-react"
import {IRootStore} from "../../store/AppStore"
import GameStore from "../../store/GameStore"
import EndScreen from "./EndScreen"
import MessagePanel from "./MessagePanel"
import PlayerBadge from "./PlayerBadge"
import * as Majavashakki from "../../../common/GamePieces"

@inject((stores: IRootStore) => ({game: stores.app.game}))
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

    const currentPlayer = game.currentUser.id === game.playerIdWhite ? Majavashakki.PieceColor.White : Majavashakki.PieceColor.Black
    const opponentPlayer = game.currentUser.id !== game.playerIdWhite ? Majavashakki.PieceColor.White : Majavashakki.PieceColor.Black

    return (
      <div className={classes.gameContainer}>
        {game.winner && <EndScreen />}
        <div className={classes.playArea}>
          <PlayerBadge color={currentPlayer} />
          <Board />
          <PlayerBadge color={opponentPlayer} />
        </div>
        <MessagePanel />
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
