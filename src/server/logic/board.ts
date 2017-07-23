import {GameRoom} from "../GameRoom";
var initialBoardState = require('../board-template.json');

export class Board {
    public myState: any;
    constructor(socket, states) {
        this.myState = states[socket.id];
        socket.on('move', (data) => {
            this.move(data.from, data.dest, socket);
        });
    }

    getInitialBoard(socket) {
        return initialBoardState.board;
    }

    move(from, dest, socket) {
        if (!from && !dest) {
            console.warn('Movement data is invalid!');
            return;
        }

        console.log(`Start: ${from.row}${from.col}, Destination: ${dest.row}${dest.col}`);

        let startCell = this.getPiece(this.myState.room.gameState.board, from);
        let destCell = this.getPiece(this.myState.room.gameState.board, dest);

        if(startCell === null) {
            console.log('Invalid move! Hacker alert!');
            return;
        }

        if(destCell === null)  {
            startCell.position = dest;
            socket.emit('move_result', this.myState.room);
            socket.broadcast.to(this.myState.room.title).emit('move_result', this.myState.room);
            console.log('Start moved to dest!');
        } else if (destCell.color !== startCell.color) {
            this.myState.room.gameState.board.splice(this.myState.room.gameState.board.indexOf(destCell));
            startCell.position = dest;
            socket.emit('move_result', this.myState.room);
            socket.broadcast.to(this.myState.room.title).emit('move_Result', this.myState.room);
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