import * as React from "react"
import { observer, inject } from "mobx-react"
import { IRootStore } from "../../../store/AppStore"
import Cell from "./Cell"
import { WithStyles, createStyles, withStyles } from "@material-ui/core"
import BoardStore from "../../../store/BoardStore"

const Board = inject((stores: IRootStore) => ({ boardStore: stores.app.game.boardStore }))(
  observer((props: IBoardProps) => (
    <div className={props.classes.board} data-test-ui-component="board">
      {props.boardStore.cells.map(cell => (
        <Cell {...cell} key={cell.position.col + cell.position.row} />
      ))}
    </div>
  ))
)

interface IBoardProps extends WithStyles<typeof styles> {
  boardStore?: BoardStore
}

const styles = createStyles({
  board: {
    display: "flex",
    flexFlow: "row wrap",
    width: "60vmin",
    border: "5px solid #000",
  },
})

export default withStyles(styles)(Board)
