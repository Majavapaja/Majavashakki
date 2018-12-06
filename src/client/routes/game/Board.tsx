import * as React from "react";
import { observer } from "mobx-react"
import * as Majavashakki from "../../../common/GamePieces"

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
      <React.Fragment>
      <div className="board">
        {board.cells.map(({position, piece}) => (
            <Cell
              piece={piece}
              onClick={() => this.onCellClick(position)}
              selected={board.comparePos(this.state.selectedCell, position)}
              targeted={board.comparePos(this.state.moveTarget, position)}
              key={position.col + position.row}
            />
        ))}
      </div>
      </React.Fragment>
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
        selectedCell: null,
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
