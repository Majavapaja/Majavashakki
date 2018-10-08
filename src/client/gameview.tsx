import * as React from "react";
import * as request from "request-promise";
import { withRouter } from "react-router-dom";
import Board from "./Board";

class GameView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      pieces: [],
      gameName: props.match.params.gameName
    }
  }

  public componentWillMount() {
    fetchGame(this.state.gameName).then(game => {
      this.setState({pieces: game.board.pieces})
      this.props.socket.on("move_result", this.onMoveResult.bind(this));
    })
  }

  public render() {
    if (!this.state.pieces) {
      return <div>>Loading...</div>
    }
    return (
      <li className="game page">
        <Board pieces={this.state.pieces} socket={this.props.socket} gameName={this.state.gameName}/>
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

function fetchGame(name) {
    return request({
        method: "GET",
        url: `${window.location.origin}/api/games/get/${name}`,
        json: true,
    })
}

export default withRouter(GameView);
