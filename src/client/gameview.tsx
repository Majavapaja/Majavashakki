import * as React from "React";

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

  cellName(x, y) {
    return "abcdefgh"[x] + String(y)
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
    const elements = []
    for (var y = 8; y > 0; y--) {
      for (var x = 0; x < 8; x++) {
        const pos = this.cellName(x, y)
        const piece = pieceMap[pos.toLowerCase()]
        const isSelected = this.state.selectedCell == pos ? 'selected' : ''

        let pieceImage = null
        if (piece) {
          const className = `piece ${piece.color} ${piece.type} `
          pieceImage = <div className={className}></div>
        }

        elements.push(
          <div className={`cell ${isSelected}`} onClick={() => this.selectCell(pos)}>
            {pieceImage}
          </div>
        )
      }
    }
    return elements
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


export default GameView
