import * as React from "react"
import classnames from "classnames"
import * as Majavashakki from "../../../../common/GamePieces"
import ChessPiece from "../ChessPiece"
import { WithStyles, createStyles, withStyles } from "@material-ui/core"
import { IRootStore } from "../../../store/AppStore"
import { inject } from "mobx-react"
import BoardStore from "../../../store/BoardStore"

const Cell = (props: ICellProps) => {
  const { classes } = props
  const dataPosition = props.position.col + props.position.row
  const classNames = classnames(classes.cell, {
    [classes.white]: props.cellColor === Majavashakki.PieceColor.White,
    [classes.black]: props.cellColor === Majavashakki.PieceColor.Black,
    [classes.selected]: props.isSelected,
    [classes.error]: props.isError,
  })

  return (
    <div
      data-position={dataPosition}
      className={classNames}
      onClick={() => props.boardStore.onCellClick(props.position)}
    >
      {props.piece && <ChessPiece color={props.piece.color} type={props.piece.type} />}
    </div>
  )
}

interface ICellProps extends WithStyles<typeof styles> {
  position: Majavashakki.IPosition
  cellColor: Majavashakki.PieceColor
  piece: Majavashakki.IPiece
  isSelected: boolean
  isError: boolean
  boardStore?: BoardStore
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
  black: {
    backgroundColor: "#333",
  },
  white: {
    backgroundColor: "#EEE",
  },
  selected: {
    backgroundColor: "#0D0",
  },
  "@keyframes flashRed": {
    "0%": {
      backgroundColor: "#F00",
    },
  },
  error: {
    animationName: "$flashRed",
    animationDuration: "1s",
    animationTimingFunction: "ease-in-out",
  },
})

const boardStore = (stores: IRootStore) => ({ boardStore: stores.app.game.boardStore })
export default inject(boardStore)(withStyles(styles)(Cell))
