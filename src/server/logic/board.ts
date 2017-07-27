// TODO refactor for TypeScript. Alex requires some explanation on how board is supposed to be managed o.o
// Probably we don't want to create instance / store userstate here.
import {UserState} from "../entities/UserState";
import {GameRoomsRepository} from "./GameRoomsRepository";
import {Piece, Position} from "../../common/types"
import {MoveResponse, MoveSuccess, MoveError} from "../../common/protocol"

export class Board {
    public currentUser: UserState;

    constructor(userState: UserState) {
        this.currentUser = userState;

        this.currentUser.socket.on('move', (data) => {
            const game = GameRoomsRepository.getInstance().getGameRoom(this.currentUser.currentRoom);
            const result = this.move(game, data.from, data.dest);
            switch (result.kind) {
            case "error":
                this.currentUser.socket.emit('move_result', result);
                break
            case "success":
                this.currentUser.socket.emit('move_result', result);
                this.currentUser.socket.broadcast.to(game.title).emit('move_result', result);
                break
            }
        });
    }

    move(game, from, dest): MoveResponse {
        if (!from && !dest) {
            console.warn('Movement data is invalid!');
            return this.error("Invalid move")
        }

        console.log(`Start: ${from.row}${from.col}, Destination: ${dest.row}${dest.col}`);
        let startCell = this.getPiece(game.gameState.board, from);
        let destCell = this.getPiece(game.gameState.board, dest);

        if(startCell === null) {
            console.log('Invalid move! Hacker alert!');
            return this.error("Invalid move")
        }

        if(!destCell)  {
            startCell.position = dest;
            console.log('Start moved to dest!');
            return this.success(game.gameState.board)
        } else if (destCell.color !== startCell.color) {
            game.gameState.board.splice(game.gameState.board.indexOf(destCell));
            startCell.position = dest;
            console.log('Start eated dest!');
            return this.success(game.gameState.board)
        } else {
            console.log('Invalid move! Hacker alert!');
            return this.error("Invalid move")
        }
    }

    success(board: [Piece]): MoveSuccess {
      return {kind: "success", board: board}
    }

    error(message: string): MoveError {
      return {kind: "error", error: message}
    }

    getPiece(board: [Piece], pos: Position): Piece {
        return board.find(piece => this.comparePos(piece.position, pos))
    }

    comparePos(a: Position, b: Position): boolean {
      return a.row === b.row && a.col === b.col
    }
}
