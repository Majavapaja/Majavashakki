import AppStore from "client/store/AppStore";
import { computed } from "mobx";
import * as Majavashakki from "../../../../common/GamePieces";
import { getPieceType } from "../../../../common/logic/algebraicNotation";

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
        isCurrentUser: currentColor === moveColor,
        name: moveColor === Majavashakki.PieceColor.White ? this._appStore.game.playerWhite.name : this._appStore.game.playerBlack.name,
      } as IActor;
      return {actor, body: `:${getPieceType(move.algebraicNotation[0])}: `
        + `${positionStr(move.start)} -> ${positionStr(move.destination)}`}
    })
  }
}

function positionStr(pos: Majavashakki.IPosition) {
  return `${pos.col + pos.row}`
}

export interface IActor {
  name: string;
  isCurrentUser: boolean;
}

export interface IMessage {
  actor: IActor;
  body: string;
}