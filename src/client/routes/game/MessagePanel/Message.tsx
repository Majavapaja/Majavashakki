import * as React from "react"
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import { IMessage } from "./MessagePanelStore"
import ChessPiece from "../ChessPiece"
import * as Majavashakki from "../../../../common/GamePieces"

class Message extends React.Component<IMessageProps, any> {
  public render() {
    const { classes, content } = this.props
    const playerClass = content.actor.isCurrentUser ? classes.activePlayer : classes.inactivePlayer

    return (
      <Typography className={classes.messageRow}>
        <Typography component="span" className={playerClass}>
          {content.actor.name.substr(0, 15)}
        </Typography>
        <Typography component="span" className={classes.messageContent}>
          {this.buildMessage()}
        </Typography>
      </Typography>
    )
  }

  private buildMessage() {
    let message = this.props.content.body
    const iconRegex = /:(.*?):/
    const components = []

    while (iconRegex.test(message)) {
      const iconStr = message.match(iconRegex)[0]
      const before = message.substr(0, message.indexOf(iconStr))
      if (before) {
        const txtBefore = (
          <Typography className={this.props.classes.messageText} component="span" key={components.length}>
            {before}
          </Typography>
        )
        components.push(txtBefore)
      }

      const [type, color] = iconStr.replace(/:/g, "").split("-")

      const piece = (
        <span className={this.props.classes.icon} key={components.length}>
          <ChessPiece type={type as Majavashakki.PieceType} color={color as Majavashakki.PieceColor} />
        </span>
      )

      components.push(piece)
      message = message.replace(before, "").replace(iconStr, "")
    }

    const txtAfter = (
      <Typography className={this.props.classes.messageText} component="span" key={components.length}>
        {message}
      </Typography>
    )
    if (message) components.push(txtAfter)

    return components
  }
}

const styles = createStyles({
  activePlayer: {
    color: "#50A450",
    flex: 1,
  },
  inactivePlayer: {
    color: "#A45050",
    flex: 1,
  },
  messageRow: {
    display: "flex",
  },
  messageContent: {
    display: "flex",
    alignItems: "center",
    flex: 7,
    whiteSpace: "pre",
  },
  messageText: {
    fontFamily: "monospace",
  },
  icon: {
    width: "15px",
    height: "15px",
    display: "block",
    backgroundColor: "#b9b9b9",
    borderRadius: "12px",
    padding: "1px",
  },
})

interface IMessageProps extends WithStyles<typeof styles> {
  content: IMessage
}

export default withStyles(styles)(Message)
