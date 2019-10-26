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

        return (
            <Typography className={classes.text}>
                <Typography component="span" className={playerClass}>
                    {content.actor.name.substr(0,15)}
                </Typography>
                <Typography component="span" className={classes.textContainer}>
                  {this.buildMessage()}
                </Typography>
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
          const txtBefore = (
            <Typography className={this.props.classes.messagePart} component="span" key={components.length}>
              {before}
            </Typography>
          )
          components.push(txtBefore)
        }

        const piece = (
          <span className={this.props.classes.icon} key={components.length}>
            <ChessPiece
              type={iconStr.replace(/:/g, "") as Majavashakki.PieceType}
              color={this.props.content.actor.pieceColor}
            />
          </span>
        )

        components.push(piece)
        message = message.replace(before, "").replace(iconStr, "")
      }

      const txtAfter = (
        <Typography className={this.props.classes.messagePart} component="span" key={components.length}>
          {message}
        </Typography>
      )
      if (message) components.push(txtAfter)

      return components
    }
}

const styles = () => ({
    activePlayer: {
      color: "#50A450",
      flex: 1,
    },
    inactivePlayer: {
      color: "#A45050",
      flex: 1,
    },
    text: {
      display: "flex",
    },
    textContainer: {
      display: "flex",
      flex: 7,
    },
    icon: {
      width: "15px",
      height: "15px",
      display: "block",
    },
})

interface IMessageProps extends WithStyles<typeof styles> {
  content: IMessage;
}

export default withStyles(styles)(Message);
