import AppStore from "client/store/AppStore"
import { computed } from "mobx"
import * as Majavashakki from "../../../../common/GamePieces"
import { getPieceType, getMoveMetadata, MoveMetadata } from "../../../../common/logic/algebraicNotation"

export default class MessagePanelStore {
  private _appStore: AppStore;

  public constructor(appStore: AppStore) {
    this._appStore = appStore;
  }

  @computed
  get parsedMoves(): IMessage[] {
    return this._appStore.game.boardStore.moveHistory.map((move, index) => {
      const moveColor = index % 2 === 0 ?  Majavashakki.PieceColor.White : Majavashakki.PieceColor.Black;

      const pieceType = `:${getPieceType(move.algebraicNotation)}-${moveColor}:`
      const moveMessage = `${pieceType} ${positionStr(move.start)} -> ${positionStr(move.destination)}`

      return {
        actor: this.getPlayerActor(moveColor),
        body: moveMessage + this.getOptionalMoveData(move, moveColor)
      }
    })
  }

  private getPlayerActor = (color: Majavashakki.PieceColor): IActor => ({
    pieceColor: color,
    isCurrentUser: this._appStore.game.currentUserColor === color,
    name: color === Majavashakki.PieceColor.White ? this._appStore.game.playerWhite.name : this._appStore.game.playerBlack.name,
  })

  private getOptionalMoveData = (move: Majavashakki.IMove, moveColor: Majavashakki.PieceColor) => {
      const capturedPieceType = move.capturedPieceType ? ` :${move.capturedPieceType}-${getOppositeColor(moveColor)}: ` : ""

      const moveMetadata = getMoveMetadata(move.algebraicNotation)
      const enpassant = (moveMetadata & MoveMetadata.Enpassant) === MoveMetadata.Enpassant ? " en passant" : ""
      const check = (moveMetadata & MoveMetadata.Check) === MoveMetadata.Check ? " check" : ""
      const checkMate = (moveMetadata & MoveMetadata.Checkmate) === MoveMetadata.Checkmate ? " checkmate" : ""

      return capturedPieceType + enpassant + (checkMate || check)
  }

}

const positionStr = (pos: Majavashakki.IPosition) => `${pos.col + pos.row}`;
const getOppositeColor = (color: Majavashakki.PieceColor) => color === Majavashakki.PieceColor.White ? Majavashakki.PieceColor.Black : Majavashakki.PieceColor.White

export interface IActor {
  name: string;
  isCurrentUser: boolean;
  pieceColor: Majavashakki.PieceColor;
}

export interface IMessage {
  actor: IActor;
  body: string;
}