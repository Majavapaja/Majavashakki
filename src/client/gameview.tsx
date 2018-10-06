import * as React from "react";
import Board from "./Board";

class GameView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentWillMount() {
    this.setState({pieces: this.props.pieces});
    this.props.socket.on("move_result", this.onMoveResult.bind(this));
    this.props.socket.on("game-joined", this.onJoined.bind(this));
  }

  public render() {
    return (
      <li className="game page">
        <Board pieces={this.state.pieces} socket={this.props.socket}/>
        {this.state.error && <p>Error: {this.state.error}</p>}
      </li>
    );
  }

  private onJoined(pieces: Majavashakki.IPiece[]) {
    if (pieces) {
      this.setState({pieces});
    }
  }

  private onMoveResult(response: Majavashakki.IMoveResponse) {
    switch (response.kind) {
    case "error":
      this.setState({
        error: response.error,
      });
      break;
    case "success":
      this.setState({
        pieces: response.board,
      });
      break;
    }
  }
}

export default GameView;
