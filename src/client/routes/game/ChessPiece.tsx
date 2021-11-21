import * as React from "react"
import { withStyles } from "@material-ui/core/styles"
import { createStyles, WithStyles } from "@material-ui/core"
import classNames from "classnames"
import { PieceColor, PieceType } from "../../../common/GamePieces"
import chessSprites from "../../assets/sprites.png"

class ChessPiece extends React.Component<IChessPieceProps, any> {
  public render() {
    return (
      <span
        data-piece-type={this.props.type}
        className={classNames(
          this.props.classes.piece,
          this.props.classes[this.props.color],
          this.props.classes[this.props.type]
        )}
      />
    )
  }
}

interface IChessPieceProps extends WithStyles<typeof styles> {
  color: PieceColor
  type: PieceType
}

const styles = () =>
  createStyles({
    piece: {
      background: `url("${chessSprites}")`,
      width: "100%",
      height: "100%",
      backgroundSize: "600%",
      display: "block",
    },
    [PieceColor.Black]: {
      backgroundPositionY: "calc(1 * 100%)",
    },
    [PieceColor.White]: {
      backgroundPositionY: "calc(0 * 100%)",
    },
    [PieceType.King]: {
      backgroundPositionX: "calc(0 * 20%)",
    },
    [PieceType.Queen]: {
      backgroundPositionX: "calc(1 * 20%)",
    },
    [PieceType.Rook]: {
      backgroundPositionX: "calc(2 * 20%)",
    },
    [PieceType.Bishop]: {
      backgroundPositionX: "calc(3 * 20%)",
    },
    [PieceType.Knight]: {
      backgroundPositionX: "calc(4 * 20%)",
    },
    [PieceType.Pawn]: {
      backgroundPositionX: "calc(5 * 20%)",
    },
  })

export default withStyles(styles)(ChessPiece)
