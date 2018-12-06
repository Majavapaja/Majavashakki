import * as React from "react"
import { withRouter } from "react-router-dom"
import { withStyles, createStyles } from "@material-ui/core/styles"
import Board from "./Board"
import { observer } from "mobx-react"
import { Paper, Typography } from "@material-ui/core"

import PlayerBadge from "./PlayerBadge"

@observer
class GameView extends React.Component<any, any> {
  constructor(props) {
    super(props)

    props.game.loadGame(props.match.params.gameName)
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
        <Paper className={classes.gameContainer}>
          <div className={classes.playersContainer}>
            <PlayerBadge
              player={{
                name: "Matti",
                color: "white",
              }}
              isCurrentPlayer={game.currentTurn === "white"}
            />
            <PlayerBadge
              player={{
                name: "Teppo",
                color: "black",
              }}
              isCurrentPlayer={game.currentTurn === "black"}
            />
          </div>
          <Board game={this.props.game} gameName={game.title}/>
          {errorContainer}
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "flex-start",
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
