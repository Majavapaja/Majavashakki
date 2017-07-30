import * as React from "react"

import {MoveResponse} from "../common/protocol"
import {Piece} from "../common/types"
import Board from "./Board"

class GameView extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  public componentWillMount() {
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

  public render() {
    return (
      <li className="game page">
        <Board pieces={this.state.pieces} socket={this.props.socket}/>
        {this.state.error && <p>Error: {this.state.error}</p>}
      </li>
    )
  }
}

export default GameView
