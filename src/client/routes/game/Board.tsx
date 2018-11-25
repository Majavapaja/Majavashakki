import * as React from "react";
import { observer } from "mobx-react"
import * as Majavashakki from "../../../common/GamePieces"

const CELL_POSITIONS: Majavashakki.IPosition[] = (() => {
  const positions = [] as Majavashakki.IPosition[];
  for (let y = 8; y > 0; y--) {
    for (let x = 0; x < 8; x++) {
      const position = {
        col: "abcdefgh"[x],
        row: String(y),
      } as Majavashakki.IPosition

      positions.push(position)
    }
  }
  return positions;
})()

@observer
class Board extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedCell: null,
      moveTarget: null,
    };
  }

  public render() {
    const board = this.props.game.board

    return (
      <div className="board">
        {CELL_POSITIONS.map(pos => (
            <Cell
              piece={board.getPiece(pos)}
              onClick={() => this.onCellClick(pos)}
              selected={board.comparePos(this.state.selectedCell, pos)}
              targeted={board.comparePos(this.state.moveTarget, pos)}
              key={pos.col + pos.row}
            />
        ))}
      </div>
    )
  }

  private onCellClick = (pos: Majavashakki.IPosition) => {
    if (this.state.moveTarget) {
      return;
    }

    if (!this.state.selectedCell && this.props.game.board.getPiece(pos)) {
      return this.setState({selectedCell: pos});
    }

    if (pos === this.state.selectedCell) {
      this.setState({selectedCell: null});
      return;
    }

    if (this.state.selectedCell) {
      this.props.game.move(this.state.selectedCell, pos)
      this.setState({
        moveTarget: null,
        selectedCell: null
      })
    }

  }
}

function Cell({piece, selected, targeted, onClick}) {
  const classes = [
    "cell",
    selected && "selected",
    targeted && "targeted",
  ].filter(Boolean);

  return (
    <div className={classes.join(" ")} onClick={onClick}>
      {piece && <Piece piece={piece}/>}
    </div>
  );
}

function Piece({piece}) {
  const {color, type} = piece;
  return <div className={`piece ${color} ${type}`} />;
}

export default Board;
