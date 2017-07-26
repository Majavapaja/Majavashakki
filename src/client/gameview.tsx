import * as React from "React";

const CELL_POSITIONS = (function() {
  const positions = []
  for (var y = 8; y > 0; y--) {
    for (var x = 0; x < 8; x++) {
      positions.push("abcdefgh"[x] + String(y))
    }
  }
  return positions
}())

class GameView extends React.Component<any,any> {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({pieces: this.props.pieces})
    this.props.socket.on('move_result', room => this.onMoveResult(room))
  }

  onMoveResult(room) {
    console.log('onMoveResult', room.gameState.board)
    this.setState({pieces: room.gameState.board})
  }

  render() {
    console.log('GameView.render')
    const stateDebug = <pre>{JSON.stringify(this.state, null, 2)}</pre>

    console.log('pieces given to Board', this.state.pieces)
    return <div>
      <Board pieces={this.state.pieces} socket={this.props.socket}/>
      {stateDebug}
    </div>
  }
}

class Board extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {
      selectedCell: undefined
    }
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
    return CELL_POSITIONS.map(pos =>
      <Cell piece={pieceMap[pos.toLowerCase()]}
            selected={this.state.selectedCell == pos}
            onClick={() => this.selectCell(pos)}
            key={pos} />)
  }

  posToJson(pos) {
    return {
      col: pos.charAt(0),
      row: pos.charAt(1),
    }
  }

  selectCell(pos) {
    if (this.state.selectedCell) {
      const movement = {
        from: this.posToJson(this.state.selectedCell),
        dest: this.posToJson(pos),
      }
      this.props.socket.emit('move', movement)

      // TODO Mark move done so we don't send multiples

      this.setState({selectedCell: undefined})
    } else {
      console.log(`selected piece at ${pos}`)
      this.setState({selectedCell: pos})
    }
  }

  render() {
    console.log('Board.render', this.props)
    return <div className='board'>{this.makeCells()}</div>
  }
}

function Cell({piece, selected, onClick}) {
  return <div className={`cell ${selected ? 'selected' : ''}`}
              onClick={onClick}>
    {piece && <Piece piece={piece}/>}
  </div>
}

function Piece({piece}) {
  const {color, type} = piece
  return <div className={`piece ${color} ${type}`}></div>
}


export default GameView
