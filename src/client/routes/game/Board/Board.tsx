import * as React from "react";
import { observer, inject } from "mobx-react"
import {IAppStore} from "../../../store/AppStore"
import Cell from "./Cell"
import { WithStyles, createStyles, withStyles } from "@material-ui/core"
import BoardStore from "../../../store/BoardStore"

const Board = inject((stores: IAppStore) => ({ boardStore: stores.app.game.boardStore }))(observer((props: IBoardProps) => (
      <React.Fragment>
      <div className={props.classes.board} data-test-ui-component="board">
        {props.boardStore.cells.map((cell) => (
            <Cell
              {...cell}
              key={cell.position.col + cell.position.row}
            />
        ))}
      </div>
      </React.Fragment>
    ),
))

interface IBoardProps extends WithStyles<typeof styles> {
  boardStore?: BoardStore
}

const styles = theme => createStyles({
  board: {
    display: "flex",
    flexFlow: "row wrap",
    width: "60vmin",
  },
})

export default withStyles(styles)(Board)
