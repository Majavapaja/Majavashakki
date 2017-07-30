import * as React from "react"

import {MoveResponse} from "../common/protocol"
import {Piece} from "../common/types"

const CELL_POSITIONS: string[] = (() => {
  const positions = [] as string[]
  for (let y = 8; y > 0; y--) {
    for (let x = 0; x < 8; x++) {
      positions.push("abcdefgh"[x] + String(y))
    }
  }
  return positions
}())

class GameView extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  private componentWillMount() {
    this.setState({pieces: this.props.pieces})
    this.props.socket.on("move_result", this.onMoveResult.bind(this))
  }

  private onMoveResult(response: MoveResponse) {
    switch (response.kind) {
    case "error":
      this.setState({
        error: response.error,
      })
      break
    case "success":
      this.setState({
        pieces: response.board,
        error: undefined,
      })
      break
    }
  }

  private render() {
    return (
      <div>
        <Board pieces={this.state.pieces} socket={this.props.socket}/>
        {this.state.error && <p>Error: {this.state.error}</p>}
      </div>
    )
  }
}

export default GameView
