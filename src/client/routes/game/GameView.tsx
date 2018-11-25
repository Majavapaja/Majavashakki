import * as React from "react";
import { withRouter } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Board from "./Board";
import { observer } from "mobx-react"
import { Paper } from "@material-ui/core";

@observer
class GameView extends React.Component<any, any> {
  constructor(props) {
    super(props)

    props.game.loadGame(props.match.params.gameName)
    if (!props.game.socket) props.game.connectSocket()
  }

  public render() {
    if (this.props.game.isLoading) {
      return <div>>Loading...</div>
    }

    let errorContainer = null
    if (this.props.game.error) {
      errorContainer = (
        <Paper className={this.props.classes.error}>
          {this.props.game.error}
        </Paper>
      )
    }

    return (
      <div className="game page">
        <div>{this.props.game.isUsersTurn() ? "Its your turn" : "Its not your turn"} (current turn: {this.props.game.currentTurn})</div>
        <Board game={this.props.game} gameName={this.props.game.title}/>
        {errorContainer}
      </div>
    );
  }
}

const styles = createStyles({
  error: {
      width: "60vmin",
      color: "#4C0000",
      background: "#D44040",
      padding: 10
  },
})

export default withStyles(styles)(withRouter(GameView));
