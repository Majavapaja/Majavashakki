import * as React from "react"
import * as Majavashakki from "../../../../common/GamePieces"
import ChessPiece from "../ChessPiece"
import { WithStyles, createStyles, withStyles } from "@material-ui/core"
import { IRootStore } from "../../../store/AppStore"
import { inject } from "mobx-react"
import BoardStore from "../../../store/BoardStore"

const Cell = (props: ICellProps) => {
  const dataPosition = props.position.col + props.position.row
  let backgroundColor = props.cellColor === Majavashakki.PieceColor.White ? "#eee" : "#333"
  if (props.isSelected) backgroundColor = "#0f0"

  return (
    <div
      data-position={dataPosition}
      className={props.classes.cell}
      style={{ backgroundColor }}
      onClick={() => props.boardStore.onCellClick(props.position)}
    >
      {props.piece && <ChessPiece color={props.piece.color} type={props.piece.type} />}
    </div>
  )
}

interface ICellProps extends WithStyles<typeof styles> {
  position: Majavashakki.IPosition,
  cellColor: Majavashakki.PieceColor,
  piece: Majavashakki.IPiece,
  isSelected: boolean,
  boardStore?: BoardStore,
}

const styles = createStyles({
  cell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 0px",
    flexBasis: "calc(60vmin / 8)",
    height: "calc(60vmin / 8)",
    textAlign: "center",
  },
})

const boardStore = (stores: IRootStore) => ({ boardStore: stores.app.game.boardStore })
export default inject(boardStore)(withStyles(styles)(Cell))
