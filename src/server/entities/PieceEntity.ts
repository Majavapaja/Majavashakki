import * as Majavashakki from "../../common/GamePieces"
import Piece from "../../common/pieces/Piece"
import Pawn from "../../common/pieces/Pawn";
import Rook from "../../common/pieces/Rook";
import Bishop from "../../common/pieces/Bishop";
import Queen from "../../common/pieces/Queen";
import King from "../../common/pieces/King";
import Knight from "../../common/pieces/Knight";
import BoardBase from "../../common/BoardBase";

export default class PieceEntity {
    public static MapToDb(piece: Piece): Majavashakki.IPiece {
        return {
            type: piece.type,
            color: piece.color,
            position: piece.position,
            hasMoved: piece.hasMoved,
        } as Majavashakki.IPiece
    }

    public static MapFromDb(dbPiece: Majavashakki.IPiece, board: BoardBase): Piece {
        let piece: Piece

        switch (dbPiece.type) {
            case Majavashakki.PieceType.Pawn:
                piece = new Pawn(dbPiece.color, dbPiece.position, board)
                break
            case Majavashakki.PieceType.Rook:
                piece = new Rook(dbPiece.color, dbPiece.position, board)
                break
            case Majavashakki.PieceType.Bishop:
                piece = new Bishop(dbPiece.color, dbPiece.position, board)
                break
            case Majavashakki.PieceType.Knight:
                piece = new Knight(dbPiece.color, dbPiece.position, board)
                break
            case Majavashakki.PieceType.Queen:
                piece = new Queen(dbPiece.color, dbPiece.position, board)
                break
            case Majavashakki.PieceType.King:
                piece = new King(dbPiece.color, dbPiece.position, board)
        }

        piece.hasMoved = dbPiece.hasMoved

        return piece
    }
}