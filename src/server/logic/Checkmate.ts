import Board from "../entities/Board";
import {copy} from "../../common/util";
import {Piece, Position} from "../../common/types";
import MovementValidator from "./MovementValidator";

export function isCheck(board: Board, color): boolean {
    // Get current players king
    const king = board.getKing(color);

    // Check if any piece of opposite color can capture king
    if (getCheckingPiece(board, king)) return true;

    return false;
}

export function doesMoveCauseCheck(board: Board, start: Position, destination: Position): boolean {
    const boardCopy: Board = new Board();
    boardCopy.pieces = copy(board.pieces);

    boardCopy.removePiece(destination);
    const startPieceCopy: Piece = boardCopy.getPiece(start);
    startPieceCopy.position = destination;
    startPieceCopy.hasMoved = true;

    // Check if board is in check after moving
    return isCheck(boardCopy, startPieceCopy.color);
}

export function isCheckMate(board: Board, color): boolean {
    // This is only checked if king is in check
    console.log("Checking checkmate");

    // 1. Can king move?
    const king = board.getKing(color);
    console.log(king.color);
    const kingRow = Board.rows.indexOf(king.position.row);
    const kingCol = Board.cols.indexOf(king.position.col);

    // Loop through all adjacent squares to king
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const pos: Position = {
                col: board.getCoordinateByIndex("col", kingCol + j),
                row: board.getCoordinateByIndex("row", kingRow + i),
            };

            if (!pos.col || !pos.row) continue;

            const result = MovementValidator.isValidMove(board, king.position, pos);
            if (result.kind === "success") {
                return false;
            }
        }
    }

    console.log("King can't move :(");

    // If king is in double check, it is checkmate as king can only escape double check by moving himself
    if (isDoubleCheck(board, king)) return true;

    console.log("Wasn't double check");

    const checkingPiece = getCheckingPiece(board, king);

    // Check if anyone capture the treathening piece
    for (const piece of board.pieces) {
        if (piece.color === king.color) {
            const result = MovementValidator.isValidMove(board, piece.position, checkingPiece.position);
            if (result.kind === "success") return false;
        }
    }

    console.log("Mr. Check cannot be captured");

    // Check if anyone can someone block the treathening piece
    // I need checking piece path to king D:

    const pathToKing = getPiecePathToKing(board, king, checkingPiece);

    if (pathToKing.length === 0) return false;

    console.log("There is path to king, can anyone block it?");

    for (const piece of board.pieces) {
        if (piece.color === king.color) {
            for (const pos of pathToKing) {
                const result = MovementValidator.isValidMove(board, piece.position, pos);
                if (result.kind === "success") return false;
            }
        }
    }

    console.log("Nope, its mate, mate");

    return true;
}

function getCheckingPiece(board: Board, king: Piece): Piece {
    if (!king) return null;

    for (const piece of board.pieces) {
        if (piece.color !== king.color) {
            const result = MovementValidator.isValidMove(board, piece.position, king.position);
            if (result.kind === "success") return piece;
        }
    }

    return null;
}

function isDoubleCheck(board: Board, king: Piece): boolean {
    let checkingPieces = 0;

    for (const piece of board.pieces) {
        if (piece.color !== king.color) {
            const result = MovementValidator.isValidMove(board, piece.position, king.position);
            if (result.kind === "success") checkingPieces ++;
        }
    }

    return checkingPieces >= 2;
}

function getPiecePathToKing(board: Board, king: Piece, piece: Piece): Position[] {
    if (piece.type === "king" || piece.type === "pawn" || piece.type === "knight") return [];

    const pathToKing = [];

    const start = MovementValidator.positionToNumbers(piece.position);
    const dest = MovementValidator.positionToNumbers(king.position);

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

        const result = MovementValidator.isValidMove(board, piece.position, MovementValidator.numbersToPosition(dest));
        if (result.kind === "success") {
            pathToKing.push(MovementValidator.numbersToPosition(dest));
        }
    }

    return pathToKing;
}
