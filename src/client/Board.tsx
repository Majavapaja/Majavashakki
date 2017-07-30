import React from "react"

class Board extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      selectedCell: null,
      moveTarget: null,
    }

    this.props.socket.on("move_result", (room) => this.onMoveResult(room))
  }

  private onMoveResult(board) {
    this.setState({
      selectedCell: null,
      moveTarget: null,
    })
  }

  private makePieceMap() {
    return this.props.pieces.reduce((map, piece) => {
      const pos = piece.position.col + piece.position.row
      map[pos] = piece
      return map
    }, {})
  }

  private makeCells() {
    const pieceMap = this.makePieceMap()
    const onCellClick = (pos) => this.onCellClick.bind(this, pos)
    return CELL_POSITIONS.map((pos: string) => (
      <Cell
        piece={pieceMap[pos.toLowerCase()]}
        selected={this.state.selectedCell === pos}
        targeted={this.state.moveTarget === pos}
        onClick={onCellClick(pos)}
        key={pos}
      />
    ))
  }

  private posToJson(pos: string) {
    return {
      col: pos.charAt(0),
      row: pos.charAt(1),
    }
  }

  private onCellClick(pos) {
    if (this.state.moveTarget) {
      return
    }

    if (!this.state.selectedCell) {
      this.setState({selectedCell: pos})
      return
    }

    if (pos === this.state.selectedCell) {
      this.setState({selectedCell: null})
      return
    }

    if (this.state.selectedCell) {
      this.props.socket.emit("move", {
        from: this.posToJson(this.state.selectedCell),
        dest: this.posToJson(pos),
      })
      this.setState({
        moveTarget: pos,
      })
    }
  }

  private render() {
    return <div className="board">{this.makeCells()}</div>
  }
}

function Cell({piece, selected, targeted, onClick}) {
  const classes = [
    "cell",
    selected && "selected",
    targeted && "targeted",
  ].filter(Boolean)

  return (
    <div className={classes.join(" ")} onClick={onClick}>
      {piece && <Piece piece={piece}/>}
    </div>
  )
}

function Piece({piece}) {
  const {color, type} = piece
  return <div className={`piece ${color} ${type}`} />
}

export default Board
