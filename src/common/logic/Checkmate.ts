import BoardBase from "../BoardBase";
import * as Majavashakki from "../../common/GamePieces"
import King from "../pieces/King";
import Piece from "../pieces/Piece";

export function isCheck(board: BoardBase, color: Majavashakki.PieceColor): boolean {
    // Get current players king
    const king = board.getKing(color);

    // Check if any piece of opposite color can capture king
    if (getCheckingPiece(board, king)) return true;

    return false;
}

export function doesMoveCauseCheck(board: BoardBase, start: Majavashakki.IPosition, destination: Majavashakki.IPosition): boolean {
    const boardCopy: BoardBase = new BoardBase();
    boardCopy.pieces = board.pieces.map(piece => piece.clone());

    const startPieceCopy = boardCopy.getPiece(start);
    boardCopy.removePiece(destination);
    startPieceCopy.position = destination;
    startPieceCopy.hasMoved = true;

    // Check if board is in check after moving
    return isCheck(boardCopy, startPieceCopy.color);
}

export function isCheckMate(board: BoardBase, color: Majavashakki.PieceColor): boolean {
    // This is only checked if king is in check
    if (!isCheck(board, color)) {
        return false
    }

    // 1. Can king move?
    const king = board.getKing(color);

    const kingRow = BoardBase.rows.indexOf(king.position.row);
    const kingCol = BoardBase.cols.indexOf(king.position.col);

    // Loop through all adjacent squares to king and check if king can move there
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const pos: Majavashakki.IPosition = {
                col: board.getCoordinateByIndex("col", kingCol + j),
                row: board.getCoordinateByIndex("row", kingRow + i),
            };

            if (!pos.col || !pos.row) continue;

            const result = board.isValidMove(king.position, pos);
            if (result.status === Majavashakki.MoveStatus.Success) {
                return false;
            }
        }
    }

    // If king is in double check, it is checkmate as king can only escape double check by moving himself
    if (isDoubleCheck(board, king)) return true;

    const checkingPiece = getCheckingPiece(board, king);

    // Check if anyone can capture the treathening piece
    for (const piece of board.pieces) {
        if (piece.color === king.color) {
            const result = board.isValidMove(piece.position, checkingPiece.position);
            if (result.status === Majavashakki.MoveStatus.Success) return false;
        }
    }

    // Check if anyone can somehow block the treathening piece
    const pathToKing = getPiecePathToKing(board, king, checkingPiece);

    // If checking piece is next to king, no one can block it
    if (pathToKing.length === 0) return true;

    for (const piece of board.pieces) {
        if (piece.color === king.color) {
            for (const pos of pathToKing) {
                const result = board.isValidMove(piece.position, pos);
                if (result.status === Majavashakki.MoveStatus.Success) return false;
            }
        }
    }

    return true;
}

function getCheckingPiece(board: BoardBase, king: King): Piece {
    // This is here because tests boards dont have kings
    if (!king) return null;

    for (const piece of board.pieces) {
        if (piece.color !== king.color) {
            if (piece.isValidMove(board, king.position)) {
                return piece
            }
        }
    }

    return null;
}

function isDoubleCheck(board: BoardBase, king: King): boolean {
    let checkingPieces = 0;

    for (const piece of board.pieces) {
        if (piece.color !== king.color) {
            if (piece.isValidMove(board, king.position)) {
                checkingPieces++
            }
        }
    }

    return checkingPieces >= 2;
}

function getPiecePathToKing(board: BoardBase, king: King, piece: Piece): Majavashakki.IPosition[] {
    if (piece.type === "king" || piece.type === "pawn" || piece.type === "knight") return [];

    const pathToKing = [];

    const start = piece.positionToNumbers(piece.position);
    const dest = king.positionToNumbers(king.position);

    let rowDiff = Math.abs(dest.row - start.row);
    let colDiff = Math.abs(dest.col - start.col);

    while (true) {
        if (dest.col > start.col) dest.col --;
        else if (dest.col < start.col) dest.col ++;
        if (dest.row > start.row) dest.row --;
        else if (dest.row < start.row) dest.row ++;

        rowDiff--;
        colDiff--;

        if (rowDiff <= 0 && colDiff <= 0) break;

        const result = board.isValidMove(piece.position, king.numbersToPosition(dest));
        if (result.status === Majavashakki.MoveStatus.Success) {
            pathToKing.push(king.numbersToPosition(dest));
        }
    }

    return pathToKing;
}
