import {UserState} from "../entities/UserState";
import {GameRoomsRepository} from "../GameRoomsRepository";
var initialBoardState = require('../board-template.json');

export class Board {
    private currentUser: UserState;
    constructor(userState: UserState) {
        this.currentUser = userState;
        this.currentUser.socket.on('move', (data) => {
            this.move(data.from, data.dest);
        });
    }

    getInitialBoard(socket) {
        return initialBoardState.board;
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

        if(destCell === null)  {
            startCell.position = dest;
            this.currentUser.socket.emit('move_result', game);
            this.currentUser.socket.broadcast.to(game.title).emit('move_result', game);
            console.log('Start moved to dest!');
        } else if (destCell.color !== startCell.color) {
            game.gameState.board.splice(game.gameState.board.indexOf(destCell));
            startCell.position = dest;
            this.currentUser.socket.emit('move_result', game);
            this.currentUser.socket.broadcast.to(game.title).emit('move_Result', game);
            console.log('Start eated dest!');
        } else {
            console.log('Invalid move! Hacker alert!');
        }
    }

    getPiece(board, pos) {
        let piece = board.find((piece) => (piece.position.row === pos.row && piece.position.col === pos.col));
        return piece ? piece : null;
    }
}