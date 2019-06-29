import * as React from "react"
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles"
import { observer, inject } from "mobx-react"
import PlayerBadge from "./PlayerBadge"
import {IRootStore} from "../../store/AppStore"
import GameStore from "../../store/GameStore"
import { PieceColor } from "../../../common/GamePieces"

@inject((stores: IRootStore) => ({ game: stores.app.game }))
@observer
class Players extends React.Component<IPlayers, any> {
  public render() {
    const { classes, game } = this.props

    return (
      <div className={classes.playersContainer}>
        <PlayerBadge
          id="whiteBadge"
          player={{
            name: game.playerWhite ? game.playerWhite.name : "N/A",
            color: "white",
          }}
          isCurrentPlayer={game.currentTurn === "white"}
          isWinner={game.winner === PieceColor.White}
        />
        <PlayerBadge
          id="blackBadge"
          player={{
            name: game.playerBlack ? game.playerBlack.name : "N/A",
            color: "black",
          }}
          isCurrentPlayer={game.currentTurn === "black"}
          isWinner={game.winner === PieceColor.Black}
        />
      </div>
    )
  }
}

interface IPlayers extends WithStyles<typeof styles> {
  game?: GameStore
}

const styles = theme => createStyles({
  playersContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing.unit * 4,
  },
})

export default withStyles(styles)(Players)
