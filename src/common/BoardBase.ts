import { createInitialPieces } from "./initial-board"
import * as Majavashakki from "./GamePieces"
import Piece from "./pieces/Piece"
import { doesMoveCauseCheck } from "./logic/Checkmate"
import Pawn from "./pieces/Pawn"
import King from "./pieces/King"
import { isCheck, isCheckMate } from "./logic/Checkmate";
import Queen from "./pieces/Queen";
import Knight from "./pieces/Knight";
import Bishop from "./pieces/Bishop";
import Rook from "./pieces/Rook";

export default class BoardBase implements Majavashakki.IBoard {
    public static readonly cols: string = "abcdefgh"
    public static readonly rows: string = "12345678"
    public pieces: Piece[]
    public moveHistory: Majavashakki.IPosition[][]

    constructor(pieces?: Piece[], moveHistory?: Majavashakki.IPosition[][]) {
        if (pieces && moveHistory) {
            this.pieces = pieces
            this.moveHistory = moveHistory
        } else {
            this.pieces = createInitialPieces(this)
            this.moveHistory = []
        }
    }

    public getPiece(pos: Majavashakki.IPosition): Piece {
        return this.pieces.find((piece) => this.comparePos(piece.position, pos))
    }

    public getKing(color): King {
        return this.pieces.find(piece => piece.color === color && piece.type === Majavashakki.PieceType.King) as King
    }

    public comparePos(a: Majavashakki.IPosition, b: Majavashakki.IPosition): boolean {
        if (!a || !b) return false
        return a.row === b.row && a.col === b.col
    }

    public isWithinBoard(pos: Majavashakki.IPosition) {
        return BoardBase.cols.indexOf(pos.col) !== -1 && BoardBase.rows.indexOf(pos.row) !== -1
    }

    public getCoordinateByIndex(type: "col"|"row", index): string {
        if (index < 0 || index >= BoardBase.rows.length) return null

        return type === "col" ? BoardBase.cols[index] : BoardBase.rows[index]
    }

    public removePiece(pos: Majavashakki.IPosition): void {
        const index: number = this.pieces.indexOf(this.getPiece(pos));
        if (index !== -1) this.pieces.splice(index, 1);
    }

    public promotePiece(pos: Majavashakki.IPosition, pieceType: Majavashakki.PieceType): Piece {
        const piece = this.getPiece(pos)
        this.removePiece(pos)

        if (pieceType === Majavashakki.PieceType.Queen) {
            const queen = new Queen(piece.color, piece.position)
            this.pieces.push(queen)
            return queen
        } else if (pieceType === Majavashakki.PieceType.Knight) {
            const knight = new Knight(piece.color, piece.position)
            this.pieces.push(knight)
            return knight
        } else if (pieceType === Majavashakki.PieceType.Rook) {
            const rook = new Rook(piece.color, piece.position)
            this.pieces.push(rook)
            return rook
        } else if (pieceType === Majavashakki.PieceType.Bishop) {
            const bishop = new Bishop(piece.color, piece.position)
            this.pieces.push(bishop)
            return bishop
        }
    }

    public isPromotion(start: Majavashakki.IPosition, destination: Majavashakki.IPosition): boolean {
        const piece = this.getPiece(start)

        function isPawn(henryPiece: Majavashakki.IPiece): henryPiece is Pawn {
            return henryPiece.type === Majavashakki.PieceType.Pawn
        }

        if (!isPawn(piece)) return false

        if (piece.isWhite() && destination.row === "8") return true
        if (piece.isBlack() && destination.row === "1") return true

        return false
    }

    public isValidMove(start: Majavashakki.IPosition, destination: Majavashakki.IPosition): Majavashakki.IMoveResponse {
        // Check that start and destination are not the same
        if (this.comparePos(start, destination)) {
            return this.createError("The piece is already where you are moving it. https://i.imgur.com/ITZImjj.png")
        }

        // Check that start and destination are within board
        if (!this.isWithinBoard(start) || !this.isWithinBoard(destination)) {
            return this.createError("Fun fact: Size of a chessboard is 8x8 squares.")
        }

        // Check that there is a piece at start position
        const startPiece = this.getPiece(start)
        if (!startPiece) {
            return this.createError("You might need to get your eyes checked, there is no piece there.")
        }

        // Check that destination is valid (different color or empty)
        const destinationPiece: Majavashakki.IPiece = this.getPiece(destination)
        if (destinationPiece && destinationPiece.color === startPiece.color) {
            return this.createError("Even though the piece might be a spy, I don't recommend capturing it.")
        }

        const move = {
            status: Majavashakki.MoveStatus.Success,
            start,
            destination,
        } as Majavashakki.IMoveResponse

        // Check that piece movement is valid
        if (!startPiece.isValidMove(this, destination)) {
            if (startPiece.type === Majavashakki.PieceType.Pawn) {
                const pawn = startPiece as Pawn
                if (pawn.isEnPassant(this, destination)) {
                    move.result = Majavashakki.MoveType.Enpassant
                    return move
                }
            } else if (startPiece.type === Majavashakki.PieceType.King) {
                const king = startPiece as King
                if (king.isCastling(this, destination)) {
                    move.result = Majavashakki.MoveType.Castling
                    return move
                }
            }
            return this.createError("I see you are new at chess, you might check the rules first https://en.wikipedia.org/wiki/Chess#Rules")
        }

        // Check if move causes check for the player
        if (doesMoveCauseCheck(this, start, destination)) {
            return this.createError("Good thing chess rules prevents you from making this move, you would have lost otherwise.")
        }

        if (this.isPromotion(start, destination)) {
            move.result = Majavashakki.MoveType.Promotion
            return move
        }

        // Piece movement was valid
        if (destinationPiece) move.result = Majavashakki.MoveType.Capture
        else move.result = Majavashakki.MoveType.Move

        return move
    }

    public move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition, promotionPiece?: Majavashakki.PieceType): Majavashakki.IMoveResponse {
        if (!start || !destination) return this.createError("Ah, movement without start or destination, philosophical.");

        const move = this.isValidMove(start, destination);
        if (move.status !== Majavashakki.MoveStatus.Success) {
            return move;
        }

        let startPiece = this.getPiece(start);

        if (move.result === Majavashakki.MoveType.Enpassant) {
            // Remove target of en passant, which is in the destination of the previous move
            this.removePiece(this.moveHistory[this.moveHistory.length - 1][1]);
        } else if (move.result === Majavashakki.MoveType.Castling) {
            startPiece.hasMoved = true;

            const rookPosition: Majavashakki.IPosition = {
                col: destination.col === "c" ? "a" : "h", // If king moved to c, get rook from left corner.
                row: startPiece.color === Majavashakki.PieceColor.White ? "1" : "8",
            };

            const rook = this.getPiece(rookPosition);
            rook.position.col = destination.col === "c" ? "d" : "f"; // If king moved to c, move rook to d
            rook.hasMoved = true;
        } else {
            if (move.result === Majavashakki.MoveType.Promotion) {
                if (!promotionPiece) return this.createError("You got a promotion, you should promote to something!")
                if (promotionPiece === Majavashakki.PieceType.Pawn) return this.createError("You are getting screwed, that isn't a promotion")
                if (promotionPiece === Majavashakki.PieceType.King) return this.createError("Are you trying to start a civil war? There can't be two kings")

                startPiece = this.promotePiece(start, promotionPiece)
            }

            this.removePiece(destination);
            startPiece.hasMoved = true;
        }

        // Move piece
        startPiece.position = destination;
        this.moveHistory.push([start, destination]);

        const nextPlayerColor = startPiece.color === Majavashakki.PieceColor.White ? Majavashakki.PieceColor.Black : Majavashakki.PieceColor.White;
        if (!isCheck(this, nextPlayerColor)) {
            return move;
        }

        move.isCheck = true

        if (isCheckMate(this, nextPlayerColor)) {
            move.isCheckmate = true
            return move
        }

        return move
    }

    private createError(msg: string): Majavashakki.IMoveResponse {
        return {
            status: Majavashakki.MoveStatus.Error,
            error: msg,
        } as Majavashakki.IMoveResponse
    }
}
