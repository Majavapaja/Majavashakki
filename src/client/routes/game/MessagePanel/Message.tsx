import * as React from "react"
import { withStyles, WithStyles } from "@material-ui/core/styles"
import { observer, inject } from "mobx-react"
import { Typography } from "@material-ui/core"
import { IAppStore } from "../../../store/AppStore";
import * as Majavashakki from "../../../../common/GamePieces"

class Message extends React.Component<IMessageProps, any> {
    public render() {
        const { classes, content, color } = this.props

        return (
            <Typography className={classes[color]}>
                {content}
            </Typography>
        )
    }
}

const styles = theme => ({
    [Majavashakki.PieceColor.White]: {
        color: "#00C",
    },
    [Majavashakki.PieceColor.Black]: {
        color: "#0C0",
    },
})

interface IMessageProps extends WithStyles<typeof styles> {
  content: string,
  color: Majavashakki.PieceColor
}

export default withStyles(styles)(Message);
