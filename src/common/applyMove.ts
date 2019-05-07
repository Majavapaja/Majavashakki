import GameEntity from "../server/entities/Game"
import * as Majavashakki from "./GamePieces"

export default async function applyMove(game: GameEntity, userId: string, data: any): Promise<[GameEntity, Majavashakki.IMoveResponse]> {
  const moveResult = await game.move(data.from, data.dest, userId, data.promotionType)
  if (moveResult.status !== Majavashakki.MoveStatus.Error) {
    game.changeTurn()
  }

  // Purkkkaaa koska ei jaksa korjata muualla SAMI
  if (moveResult.status !== "error") {
    if (typeof moveResult.isCheck === "undefined") moveResult.isCheck = false
    if (typeof moveResult.isCheckmate === "undefined") moveResult.isCheckmate = false
  }

  if (moveResult.isCheckmate) {
    game.inProgress = false
  }

  return [game, moveResult]
}
