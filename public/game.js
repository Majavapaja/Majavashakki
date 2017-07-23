const React = require('react')
const ReactDOM = require('react-dom')

const CELL_POSITIONS = (function() {
  const positions = []
  for (var y = 8; y > 0; y--) {
    for (var x = 0; x < 8; x++) {
      positions.push("abcdefgh"[x] + String(y))
    }
  }
  return positions
}())

export class GameView extends React.Component {
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
    return (
      <div>
        <Board pieces={this.state.pieces}
               socket={this.props.socket}/>
        {stateDebug}
      </div>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCell: undefined
    }
  }

  getInitialState() {
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

    const Cell = ({position, piece, selected}) => {
      let pieceImage = null
      if (piece) {
        const {color, type} = piece
        pieceImage = <div className={`piece ${color} ${type}`}></div>
      }

      return (
        <div className={`cell ${selected ? 'selected' : ''}`}
             onClick={() => this.selectCell(position)}>
          {pieceImage}
        </div>
      )
    }

  
    return CELL_POSITIONS.map(pos => {
      const piece = pieceMap[pos]
      const isSelected = this.state.selectedCell == pos
      return <Cell key={pos} position={pos} piece={piece} selected={isSelected}/>
    })
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
    return (
      <div className='board'>
        {this.makeCells()}
        <pre>{JSON.stringify(this.pieceMap, null, 2)}</pre>
      </div>
    )
  }
}
