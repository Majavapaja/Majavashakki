import * as React from "react"
import { withStyles, WithStyles, Theme } from "@material-ui/core/styles"
import { observer, inject } from "mobx-react"
import { Chip, Avatar } from "@material-ui/core"
import classNames from "classnames"
import { IRootStore } from "../../store/AppStore";
import GameStore from "../../store/GameStore";
import * as Majavashakki from "../../../common/GamePieces"

@inject((stores: IRootStore) => ({game: stores.app.game}))
@observer
class PlayerBadge extends React.Component<IPlayerBadgeProps, any> {
  public render() {
    const { classes, color, game } = this.props

    const player = color === Majavashakki.PieceColor.White ? game.playerWhite : game.playerBlack

    const rootClasses = classNames(
      classes.root,
      { active: game.currentTurn === color, winner: game.winner === color },
    )

    return (
      <Chip
        id={`${color}Badge`}
        className={rootClasses}
        avatar={<Avatar className={[classes.playerColor, color].join(" ")} />}
        label={player ? player.name : "N/A"}
      />
    )
  }
}

const styles = (theme: Theme) => ({
  root: {
    margin: "0 20px",
    opacity: 0.5,
    "&.active": {
      backgroundColor: "#EBEBEB",
      color: "#000",
      opacity: 1,
    },
    "&.winner": {
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
  color: Majavashakki.PieceColor
}

export default withStyles(styles)(PlayerBadge);
