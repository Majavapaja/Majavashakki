import * as React from "react"
import { withStyles, WithStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import classnames from "classnames"
import { IMessage } from "./MessagePanelStore"
import ChessPiece from "../ChessPiece";
import * as Majavashakki from "../../../../common/GamePieces"

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
                {this.buildMessage()}
            </Typography>
        )
    }

    private buildMessage() {
        let message = this.props.content.body;
        console.log(message)
        const iconRegex = /:(.*?):/
        const components = []
        while (iconRegex.test(message)) {
            const iconStr = message.match(iconRegex)[0]
            const before = message.substr(0, message.indexOf(iconStr))
            if (before) {
                components.push(<Typography className={this.props.classes.messagePart} component="span">{before}</Typography>)
            }
            const piece = (
              <span className={this.props.classes.icon}>
                <ChessPiece
                  type={iconStr.replace(/:/g, "") as Majavashakki.PieceType}
                  color={this.props.content.actor.pieceColor}
                />
              </span>
            )

            components.push(piece)
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
    icon: {
      width: "15px",
      height: "15px",
    },
})

interface IMessageProps extends WithStyles<typeof styles> {
  content: IMessage;
}

export default withStyles(styles)(Message);
