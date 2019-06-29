import * as React from "react"
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles"
import { Typography, Paper } from "@material-ui/core"
import { IRootStore } from "client/store/AppStore"
import { observer, inject } from "mobx-react"
import GameStore from "client/store/GameStore"
import Message from "./Message"
import * as Majavashakki from "../../../../common/GamePieces"

@inject((stores: IRootStore) => ({game: stores.app.game}))
@observer
class MessagePanel extends React.Component<IMessagePanelProps, any> {
    public render() {
        console.log(this.props.game)
        return (
            <Paper className={this.props.classes.container}>
                {this.props.game.boardStore.moveHistory.map((move, index) => {
                    console.log("test")
                    const color = index % 2 === 0 ? Majavashakki.PieceColor.Black : Majavashakki.PieceColor.White
                    return (
                        <Message color={color} content={move.algebraicNotation} key={index} />
                    )
                })}
            </Paper>
        )
    }
}

interface IMessagePanelProps extends WithStyles<typeof styles> {
    game?: GameStore,
}

const styles = () => createStyles({
  container: {
    height: "20vmin",
  },
})

export default withStyles(styles)(MessagePanel)
