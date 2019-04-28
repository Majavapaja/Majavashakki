import * as React from "react";
import * as Majavashakki from "../../../../common/GamePieces"
import ChessPiece from "../ChessPiece"
import { WithStyles, createStyles, withStyles } from "@material-ui/core"

const Cell = (props: ICellProps) => {
  const dataPosition = props.position.col + props.position.row
  let backgroundColor = props.cellColor === Majavashakki.PieceColor.White ? "#eee" : "#333"
  if (props.selected) backgroundColor = "#00f"

  return (
    <div
      data-position={dataPosition}
      className={props.classes.cell}
      style={{ backgroundColor }}
      onClick={props.onClick}
    >
      {props.piece && <ChessPiece color={props.piece.color} type={props.piece.type} />}
    </div>
  )
}

interface ICellProps extends WithStyles<typeof styles> {
  position: Majavashakki.IPosition,
  cellColor: Majavashakki.PieceColor,
  piece: Majavashakki.IPiece,
  selected: boolean,
  onClick: any,
}

const styles = theme => createStyles({
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

export default withStyles(styles)(Cell)
