import * as React from "react"
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles"
import Board from "./Board"
import { observer, inject } from "mobx-react"
import { Chip, Typography, Avatar } from "@material-ui/core"
import classNames from "classnames"
import { IAppStore } from "../../store/AppStore";
import GameStore from "../../store/GameStore";
import * as Majavashakki from "../../../common/GamePieces"

@inject((stores: IAppStore) => ({game: stores.app.game}))
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

const styles = theme => ({
    root: {
        margin: "0 20px",
        "&.active": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
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
