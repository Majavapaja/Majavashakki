import * as React from "react"
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import { IRootStore } from "client/store/AppStore"
import { observer, inject } from "mobx-react"
import Message from "./Message"
import MessagePanelStore from "./MessagePanelStore"

@inject((stores: IRootStore) => ({ store: stores.app.messagePanel }))
@observer
class MessagePanel extends React.Component<IMessagePanelProps, any> {
  public render() {
    return (
      <Paper className={this.props.classes.container}>
        {this.props.store.parsedMoves.map((message, index) => {
          return (
            <Message content={message} key={index} />
          )
        })}
      </Paper>
    )
  }
}

interface IMessagePanelProps extends WithStyles<typeof styles> {
  store?: MessagePanelStore,
}

const styles = () => createStyles({
  container: {
    height: "20vmin",
    padding: 10,
    overflow: 'auto',
  },
})

export default withStyles(styles)(MessagePanel)
