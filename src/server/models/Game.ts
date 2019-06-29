import { Document, Schema, Model, model, Types } from "mongoose"
import GameEntity from "../entities/Game"
import * as Majavashakki from "../../common/GamePieces"

const PositionSchema = new Schema({
  col: String,
  row: String,
}, { _id: false })

const PieceSchema = new Schema({
  type: { type: String },
  position: PositionSchema,
  color: String,
  hasMoved: Boolean,
}, { _id: false })

const MoveSchema = new Schema({
  start: PositionSchema,
  destination: PositionSchema,
  algebraicNotation: String,
}, { _id: false })

const BoardSchema = new Schema({
  pieces: [ PieceSchema ],
  moveHistory: [ MoveSchema ],
}, { _id: false })

const GameSchema: Schema = new Schema({
  title: { type: String, index: true, unique: true },
  playerIdWhite: { type: String, index: true },
  playerIdBlack: { type: String, index: true },
  board: BoardSchema,
  currentTurn: String,
  // Indexed because it is in frequent use
  inProgress: { type: Boolean, index: true },
  surrenderer: {
    type: String,
    validate: function(surrenderer) {
      return !surrenderer || (surrenderer === this.playerIdWhite || surrenderer === this.playerIdBlack)
    },
  },
})

GameSchema.statics.findOrCreate = async (title: string): Promise<IGameDocument> => {
  const result = await Game.findOne({title}).exec();

  if (!result) {
    const game = new GameEntity(title);
    return await Game.updateOrCreate(game, true)
  } else {
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result
  }
}

GameSchema.statics.updateOrCreate = async (game: GameEntity, isNew: boolean = false): Promise<IGameDocument> => {
  return await Game.findOneAndUpdate(
    {title: game.title},
    GameEntity.MapForDb(game),
    {new: true, upsert: isNew},
  ).exec();
}

GameSchema.statics.findGame = async (id: string): Promise<IGameDocument> => {
  if (Types.ObjectId.isValid(id)) {
    return await await Game.findById(id)
  }
}

GameSchema.statics.getGameList = async (userId: string, inProgress: boolean): Promise<IGameDocument[]> => {
  const hasFreeSeat = { $or: [{ playerIdWhite: null }, { playerIdBlack: null }] }
  const inGame = { $or: [{ playerIdWhite: userId }, { playerIdBlack: userId }] }

  return await Game.find()
    .and([
      { $or: [hasFreeSeat, inGame] },
      { inProgress },
    ])
    .select({ title: true, playerIdBlack: true, playerIdWhite: true })
    .exec()
}

export function isFull(doc: IGameDocument): boolean {
  return !!doc.playerIdWhite && !!doc.playerIdBlack
}

export function userInGame(doc: IGameDocument, userId: string): boolean {
  return doc.playerIdWhite === userId || doc.playerIdBlack === userId
}

export function addPlayer(doc: IGameDocument, userId: string): void {
  if (!doc.playerIdWhite) {
    doc.playerIdWhite = userId
  } else if (!doc.playerIdBlack) {
    doc.playerIdBlack = userId
  } else {
    throw new Error("Paskaa täynnä, ei mahu - shit has hit fan even though it should not be possible, call Avengers")
  }
}

export interface IGameDocument extends Majavashakki.IGame, Document {}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>
  updateOrCreate(game: GameEntity, isNew?: boolean): Promise<IGameDocument>
  findGame(id: string): Promise<IGameDocument>
  getGameList(userId: string, inProgress: boolean): Promise<IGameDocument[]>
}

export const Game: IGameModel = model<IGameDocument, IGameModel>("Game", GameSchema, "games")
