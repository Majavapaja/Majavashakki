import * as React from "react"
import { withRouter } from "react-router-dom"
import { withStyles, createStyles } from "@material-ui/core/styles"
import Board from "./Board"
import { observer } from "mobx-react"
import { Paper, Typography } from "@material-ui/core"

import PlayerBadge from "./PlayerBadge"
import EndScreen from "./EndScreen"

@observer
class GameView extends React.Component<any, any> {
  constructor(props) {
    super(props)

    props.game.loadGame(props.match.params.gameId)
    if (!props.game.socket) props.game.connectSocket()
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
              player={{
                name: "Matti",
                color: "white",
              }}
              isCurrentPlayer={game.currentTurn === "white"}
              isWinner={game.isCheckmate && game.currentTurn === "black"}
            />
            <PlayerBadge
              player={{
                name: "Teppo",
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
        content = <React.Fragment>
          <Typography variant="display2">The winner is {winner}</Typography>
          <EndScreen />
        </React.Fragment>

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

const styles = theme => ({
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
