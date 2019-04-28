import * as React from "react";
import { observer, inject } from "mobx-react"
import {IAppStore} from "../../../store/AppStore"
import Cell from "./Cell"
import { WithStyles, createStyles, withStyles } from "@material-ui/core"
import BoardStore from "../../../store/BoardStore"

const Board = inject((stores: IAppStore) => ({ boardStore: stores.app.game.boardStore }))(observer((props: IBoardProps) => (
      <React.Fragment>
      <div className={props.classes.board} data-test-ui-component="board">
        {props.boardStore.cells.map(({position, piece}) => (
            <Cell
              piece={piece}
              cellColor={props.boardStore.getCellColor(position)}
              onClick={() => props.boardStore.onCellClick(position)}
              selected={props.boardStore.comparePos(props.boardStore.selectedCell, position)}
              targeted={props.boardStore.comparePos(props.boardStore.moveTarget, position)}
              position={position}
              key={position.col + position.row}
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
