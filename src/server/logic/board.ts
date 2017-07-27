// TODO refactor for TypeScript. Alex requires some explanation on how board is supposed to be managed o.o
// Probably we don't want to create instance / store userstate here.
import {UserState} from "../entities/UserState";
import {GameRoomsRepository} from "../GameRoomsRepository";
import {Piece} from "../../common/types"

export class Board {
    public currentUser: UserState;
    constructor(userState: UserState) {
        this.currentUser = userState;
        this.currentUser.socket.on('move', (data) => {
            this.move(data.from, data.dest);
        });
    }

    move(from, dest) {
        if (!from && !dest) {
            console.warn('Movement data is invalid!');
            return;
        }
        var gameRepo = GameRoomsRepository.getInstance();
        var game = gameRepo.getGameRoom(this.currentUser.currentRoom);

        console.log(`Start: ${from.row}${from.col}, Destination: ${dest.row}${dest.col}`);
        let startCell = this.getPiece(game.gameState.board, from);
        let destCell = this.getPiece(game.gameState.board, dest);

        if(startCell === null) {
            console.log('Invalid move! Hacker alert!');
            return;
        }

        if(!destCell)  {
            startCell.position = dest;
            this.currentUser.socket.emit('move_result', game.gameState.board);
            this.currentUser.socket.broadcast.to(game.title).emit('move_result', game.gameState.board);
            console.log('Start moved to dest!');
        } else if (destCell.color !== startCell.color) {
            game.gameState.board.splice(game.gameState.board.indexOf(destCell));
            startCell.position = dest;
            this.currentUser.socket.emit('move_result', game.gameState.board);
            this.currentUser.socket.broadcast.to(game.title).emit('move_Result', game.gameState.board);
            console.log('Start eated dest!');
        } else {
            console.log('Invalid move! Hacker alert!');
        }
    }

    getPiece(board: [Piece], pos): Piece {
        return board.find(piece => this.comparePos(piece.position, pos))
    }

    comparePos(a, b) {
      return a.row === b.row && a.col === b.col
    }
}
