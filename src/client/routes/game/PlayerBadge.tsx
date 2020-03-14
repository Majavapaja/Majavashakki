import * as React from "react"
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles"
import { observer, inject } from "mobx-react"
import { Chip, Avatar, Button } from "@material-ui/core"
import classNames from "classnames"
import { IRootStore } from "../../store/AppStore"
import GameStore from "../../store/GameStore"
import * as Majavashakki from "../../../common/GamePieces"
import SurrenderButton from "./SurrenderButton"

@inject((stores: IRootStore) => ({ game: stores.app.game }))
@observer
class PlayerBadge extends React.Component<IPlayerBadgeProps, any> {
  public render() {
    const { classes, color, game } = this.props

    const player = color === Majavashakki.PieceColor.White ? game.playerWhite : game.playerBlack
    const isActive = game.currentTurn === color
    const isWinner = game.winner === color

    return (
      <div className={classes.container}>
        <Chip
          id={`${color}Badge`}
          className={classNames(classes.badge, { isActive, isWinner })}
          avatar={<Avatar className={[classes.playerColor, color].join(" ")} />}
          label={player ? player.name : "N/A"}
        />
        {this.props.renderSurrender &&
          <SurrenderButton disabled={!isActive} />
        }
      </div>
    )
  }
}

const styles = (theme: Theme) => createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "0 20px",
  },
  badge: {
    opacity: 0.5,
    "&.isActive": {
      backgroundColor: "#EBEBEB",
      color: "#000",
      opacity: 1,
    },
    "&.isWinner": {
      backgroundColor: "green",
      color: theme.palette.primary.contrastText,
    },
  },
  playerColor: {
    width: 50,
    height: 50,
    border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: "50%",
    "&.white": {
      backgroundColor: "#FFF",
    },
    "&.black": {
      backgroundColor: "#000",
    },
  },
})

interface IPlayerBadgeProps extends WithStyles<typeof styles> {
  game?: GameStore,
  renderSurrender?: boolean,
  color: Majavashakki.PieceColor,
}

export default withStyles(styles)(PlayerBadge)
