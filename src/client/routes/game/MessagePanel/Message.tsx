import * as React from "react"
import { withStyles, WithStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import { IMessage } from "./MessagePanelStore";

class Message extends React.Component<IMessageProps, any> {
    public render() {
        const { classes, content } = this.props

        return (
            <Typography className={content.actor.isCurrentUser ? classes.activePlayer : classes.inactivePlayer}>
                {content.actor.name + ": " + content.body}
            </Typography>
        )
    }
}

const styles = theme => ({
    activePlayer: {
        color: "#00C",
    },
    inactivePlayer: {
        color: "#0C0",
    },
})

interface IMessageProps extends WithStyles<typeof styles> {
  content: IMessage;
}

export default withStyles(styles)(Message);
