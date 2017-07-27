import * as React from "React";

import {Piece} from "../common/types"
import {MoveResponse} from "../common/protocol"

const CELL_POSITIONS: [string] = (function() {
  const positions = [] as [string]
  for (var y = 8; y > 0; y--) {
    for (var x = 0; x < 8; x++) {
      positions.push("abcdefgh"[x] + String(y))
    }
  }
  return positions
}())

interface GameViewProps {
  pieces: [Piece]
  socket: SocketIOClient.Socket
}

interface GameViewState {
  pieces: [Piece]
  error?: string
}

class GameView extends React.Component<GameViewProps, GameViewState> {
  constructor(props: GameViewProps) {
    super(props)
  }

  componentWillMount() {
    this.setState({pieces: this.props.pieces})
    this.props.socket.on('move_result', this.onMoveResult.bind(this))
  }

  onMoveResult(response: MoveResponse) {
    switch (response.kind) {
    case "error":
      this.setState({
        error: response.error
      })
      break
    case "success":
      this.setState({
        pieces: response.board,
        error: undefined
      })
      break
    }
  }

  render() {
    return <div>
      <Board pieces={this.state.pieces} socket={this.props.socket}/>
      {this.state.error && <p>Error: {this.state.error}</p>}
    </div>
  }
}


interface BoardProps {
  pieces: [Piece]
  socket: SocketIOClient.Socket
}

interface BoardState {
  selectedCell?: string
  moveTarget?: string
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props)
    this.state = {
      selectedCell: null,
      moveTarget: null,
    }

    this.props.socket.on('move_result', room => this.onMoveResult(room))
  }

  onMoveResult(board) {
    this.setState({
      selectedCell: null,
      moveTarget: null,
    })
  }

  makePieceMap() {
    return this.props.pieces.reduce((map, piece) => {
      const pos = piece.position.col + piece.position.row
      map[pos] = piece
      return map
    }, {})
  }
  
  makeCells() {
    const pieceMap = this.makePieceMap()
    return CELL_POSITIONS.map((pos: string) =>
      <Cell piece={pieceMap[pos.toLowerCase()]}
            selected={this.state.selectedCell == pos}
            targeted={this.state.moveTarget == pos}
            onClick={() => this.onCellClick(pos)}
            key={pos} />)
  }

  posToJson(pos: string) {
    return {
      col: pos.charAt(0),
      row: pos.charAt(1),
    }
  }

  onCellClick(pos) {
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
      this.props.socket.emit('move', {
        from: this.posToJson(this.state.selectedCell),
        dest: this.posToJson(pos),
      })
      this.setState({
        moveTarget: pos
      })
    }
  }

  render() {
    return <div className='board'>{this.makeCells()}</div>
  }
}

function Cell({piece, selected, targeted, onClick}) {
  const classes = [
    'cell',
    selected && 'selected',
    targeted && 'targeted'
  ].filter(Boolean)

  return <div className={classes.join(' ')} onClick={onClick}>
    {piece && <Piece piece={piece}/>}
  </div>
}

function Piece({piece}) {
  const {color, type} = piece
  return <div className={`piece ${color} ${type}`}></div>
}


export default GameView
