import AppStore from "client/store/AppStore"
import { computed } from "mobx"
import * as Majavashakki from "../../../../common/GamePieces"
import { getPieceType } from "../../../../common/logic/algebraicNotation"

export default class MessagePanelStore {
  private _appStore: AppStore;
  public constructor(appStore: AppStore) {
    this._appStore = appStore;
  }

  @computed
  get parsedMoves(): IMessage[] {
    const currentColor = this._appStore.game.currentUserColor;
    return this._appStore.game.boardStore.moveHistory.map((move, index) => {
      const moveColor = index % 2 === 0 ?  Majavashakki.PieceColor.White : Majavashakki.PieceColor.Black;
      const actor = {
        pieceColor: moveColor,
        isCurrentUser: currentColor === moveColor,
        name: moveColor === Majavashakki.PieceColor.White ? this._appStore.game.playerWhite.name : this._appStore.game.playerBlack.name,
      } as IActor;

      const pieceType = `:${getPieceType(move.algebraicNotation)}-${moveColor}:`
      const capturedPieceType = move.capturedPieceType ? `:${move.capturedPieceType}-${getOppositeColor(moveColor)}: ` : ''

      return {actor, body: `${pieceType} ${positionStr(move.start)} ____ ${capturedPieceType}${positionStr(move.destination)}`}
    })
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