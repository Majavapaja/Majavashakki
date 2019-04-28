import * as React from "react"
import { withRouter } from "react-router-dom"
import { withStyles, createStyles, Theme } from "@material-ui/core/styles"
import Board from "./Board"
import { observer, inject } from "mobx-react"
import { Paper, Typography } from "@material-ui/core"
import {IAppStore} from "../../models/AppContainer"

import PlayerBadge from "./PlayerBadge"
import EndScreen from "./EndScreen"

@inject((stores: IAppStore) => ({game: stores.app.game}))
@observer
class GameView extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  pubclic async componentDidMount() {
    const {game, match} = this.props
    await game.loadGame(match.params.gameId)
    if (!game.socket) game.connectSocket()
  }

  public render() {
    const { classes, game } = this.props
    if (game.isLoading) {
      return <div>Loading...</div>
    }

    let errorContainer = null
    if (game.error) {
      errorContainer = (
        <Paper className={classes.error}>
          {game.error}
        </Paper>
      )
    }

    return (
      <div className={classes.root}>
        <div className={classes.gameContainer}>
        <Paper className={classes.paper}>
          <div className={classes.playersContainer}>
            <PlayerBadge
              id="whiteBadge"
              player={{
                name: game.playerWhite ? game.playerWhite.name : "N/A",
                color: "white",
              }}
              isCurrentPlayer={game.currentTurn === "white"}
              isWinner={game.isCheckmate && game.currentTurn === "black"}
            />
            <PlayerBadge
              id="blackBadge"
              player={{
                name: game.playerBlack ? game.playerBlack.name : "N/A",
                color: "black",
              }}
              isCurrentPlayer={game.currentTurn === "black"}
              isWinner={game.isCheckmate && game.currentTurn === "white"}
            />
          </div>
          <Board game={this.props.game} gameName={game.title}/>
          {errorContainer}
        </Paper>
        {this.renderCheckmateInfo()}
        </div>
      </div>
    );
  }

  private renderCheckmateInfo() {
    const {classes, game} = this.props

    if (game.isCheckmate || game.isCheck) {
      let content
      if (game.isCheckmate) {
        const winner = game.currentTurn === "white" ? "black" : "white"
        content = (
          <React.Fragment>
            <Typography id="winMessage" variant="display2">The winner is {winner}</Typography>
            <EndScreen />
          </React.Fragment>
        )

      } else if (game.isCheck) {
        content = <Typography variant="display2">Check!</Typography>
      }

      return (
        <Paper className={[classes.paper, classes.checkmateInfo].join(" ")}>
          {content}
        </Paper>
      )
    }
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  checkmateInfo: {
    textAlign: "center",
  },
  gameContainer: {
    marginTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  error: {
      width: "60vmin",
      color: "#4C0000",
      background: "#D44040",
      padding: 10,
  },
  playersContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing.unit * 4,
  },
})

export default withStyles(styles)(withRouter(GameView));
