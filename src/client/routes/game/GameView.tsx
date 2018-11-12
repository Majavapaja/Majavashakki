import * as React from "react";
import ApiService from "../../common/ApiService";
import { withRouter } from "react-router-dom";
import Board from "./Board";
import * as Majavashakki from "../../../common/GamePieces"
import { getSocket } from "../socket";

class GameView extends React.Component<any, any> {
  private socket: SocketIOClient.Socket

  constructor(props: any) {
    super(props);
    this.state = {
      pieces: [],
      gameName: props.match.params.gameName
    }
    this.socket = getSocket()
  }

  public async componentWillMount() {
    const game = await ApiService.read.game(this.state.gameName);
    this.setState({ pieces: game.pieces });
    this.socket.on("move_result", this.onMoveResult.bind(this));
  }

  public render() {
    if (!this.state.pieces) {
      return <div>>Loading...</div>
    }
    return (
      <li className="game page">
        <Board pieces={this.state.pieces} gameName={this.state.gameName}/>
        {this.state.error && <p>Error: {this.state.error}</p>}
      </li>
    );
  }

  private onMoveResult(response: Majavashakki.IMoveResponse) {
    if (response.status === Majavashakki.MoveStatus.Error) {
      this.setState({error: response.error})
    } else {
      this.movePiece(response.start, response.destination)
    }
  }

  private movePiece(start: Majavashakki.IPosition, destination: Majavashakki.IPosition) {
    const endPiece = this.findPiece(destination)
    const pieces = this.state.pieces.filter(piece => piece !== endPiece)
    const startPiece = this.findPiece(start)
    startPiece.position = destination
    this.setState({ pieces: [ ...pieces ]})
  }

  private findPiece(position: Majavashakki.IPosition): Majavashakki.IPiece {
    // TODO: Replace compare with board.comparePos
    return this.state.pieces.find(piece => piece.position.col === position.col && piece.position.row === position.row)
  }
}

export default withRouter(GameView);
