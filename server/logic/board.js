class Board {
    constructor(socket) {
        socket.on('move', (data) => {
            this.move(data.from, data.dest, socket);
        });
    }

    move(from, dest, socket) {
        if (!from && !dest) {
            console.warn('Movement data is invalid!');
            return;
        }

        console.log(`Start: ${from.row}${from.col}, Destination: ${dest.row}${dest.col}`);

        // Test data
        socket.room = {};
        socket.room.gameState = {};
        socket.room.gameState.board = [
            {
                type: 'pawn',
                color: 'white',
                position: {
                    row: '3',
                    col: 'b'
                }
            }, {
                type: 'pawn',
                color: 'white',
                position: {
                    row: '1',
                    col: 'b'
                }
            }, {
                type: 'pawn',
                color: 'white',
                position: {
                    row: '2',
                    col: 'b'
                }
            }, {
                type: 'pawn',
                color: 'black',
                position: {
                    row: '1',
                    col: 'd'
                }
            }
        ];

        let startCell = this.getPiece(socket.room.gameState.board, from);
        let destCell = this.getPiece(socket.room.gameState.board, dest);
        
        if(destCell === null)  {
            startCell.position = dest;
            console.log('Start moved to dest!');
        } else if (destCell.color !== startCell.color) {
            socket.room.gameState.board.splice(socket.room.gameState.board.indexOf(destCell));
            startCell.position = dest;
            console.log('Start eated dest!');
        } else {
            console.log('INVALID MOVE!');
        }
    }

    getPiece(board, pos) {
        let piece = board.find((piece) => (piece.position.row === pos.row && piece.position.col === pos.col));
        return piece ? piece : null;
    }
}

module.exports = Board;