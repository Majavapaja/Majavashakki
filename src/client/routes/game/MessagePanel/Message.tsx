import * as React from "react"
import { withStyles, WithStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import classnames from 'classnames'
import { IMessage } from "./MessagePanelStore"

class Message extends React.Component<IMessageProps, any> {
    public render() {
        const { classes, content } = this.props
        const playerClass = content.actor.isCurrentUser ? classes.activePlayer : classes.inactivePlayer
        const playerClasses = classnames(classes.messagePart, playerClass)

        return (
            <Typography className={classes.text}>
                <Typography component="span" className={playerClasses}>
                    {content.actor.name + ": "}
                </Typography>
                {this.buildMessage(content.body)}
            </Typography>
        )
    }

    private buildMessage(message: string) {
        const iconRegex = /:(.*?):/
        const components = []
        while (iconRegex.test(message)) {
            const iconStr = message.match(iconRegex)[0]
            const before = message.substr(0, message.indexOf(iconStr))
            if (before) {
                components.push(<Typography className={this.props.classes.messagePart} component="span">{before}</Typography>)
            }

            components.push(<Typography className={this.props.classes.messagePart} component="span">{iconStr}</Typography>)

            message = message.replace(before, "").replace(iconStr, "")
        }

        if (message) components.push(<Typography className={this.props.classes.messagePart} component="span">{message}</Typography>)

        return components
    }
}

const styles = () => ({
    activePlayer: {
        color: "#50A450",
    },
    inactivePlayer: {
        color: "#A45050",
    },
    text: {
        display: "flex",
    },
    messagePart: {
        marginRight: "5px",
    },
})

interface IMessageProps extends WithStyles<typeof styles> {
  content: IMessage;
}

export default withStyles(styles)(Message);
