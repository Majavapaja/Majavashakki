import * as React from "react";
import { getSocket } from "../socket";

const CELL_POSITIONS: string[] = (() => {
  const positions = [] as string[];
  for (let y = 8; y > 0; y--) {
    for (let x = 0; x < 8; x++) {
      positions.push("abcdefgh"[x] + String(y));
    }
  }
  return positions;
})();

class Board extends React.Component<any, any> {
  private socket: SocketIOClient.Socket

  constructor(props) {
    super(props);
    this.state = {
      selectedCell: null,
      moveTarget: null,
    };

    this.onMoveResult = this.onMoveResult.bind(this)
    this.socket = getSocket()
  }

  public componentWillMount() {
    this.socket.on("move_result", this.onMoveResult);
  }

  public render() {
    return <div className="board">{this.makeCells()}</div>;
  }

  private onMoveResult() {
    this.setState({
      selectedCell: null,
      moveTarget: null,
    });
  }

  private makePieceMap() {
    return this.props.pieces.reduce((map, piece) => {
      const pos = piece.position.col + piece.position.row;
      map[pos] = piece;
      return map;
    }, {});
  }

  private makeCells() {
    const pieceMap = this.makePieceMap();
    const onCellClick = (pos) => this.onCellClick.bind(this, pos);
    return CELL_POSITIONS.map((pos: string) => (
      <Cell
        piece={pieceMap[pos.toLowerCase()]}
        selected={this.state.selectedCell === pos}
        targeted={this.state.moveTarget === pos}
        onClick={onCellClick(pos)}
        key={pos}
      />
    ));
  }

  private posToJson(pos: string) {
    return {
      col: pos.charAt(0),
      row: pos.charAt(1),
    };
  }

  private onCellClick(pos) {
    if (this.state.moveTarget) {
      return;
    }

    if (!this.state.selectedCell && this.makePieceMap()[pos]) {
      return this.setState({selectedCell: pos});
    }

    if (pos === this.state.selectedCell) {
      this.setState({selectedCell: null});
      return;
    }

    if (this.state.selectedCell) {
      this.socket.emit("move", {
        gameName: this.props.gameName,
        from: this.posToJson(this.state.selectedCell),
        dest: this.posToJson(pos),
      });
      this.setState({
        moveTarget: pos,
      });
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
