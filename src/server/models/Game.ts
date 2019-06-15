import {Document, Schema, Model, model, Types} from "mongoose"
import Game from "../entities/Game"
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
  title: { type: String, unique: true },
  playerIdWhite: { type: String, index: true },
  playerIdBlack: { type: String, index: true },
  board: BoardSchema,
  currentTurn: String,
  inProgress: Boolean,
  surrenderer: {
    type: String,
    validate: function(surrenderer) {
      return !surrenderer || (surrenderer === this.playerIdWhite || surrenderer === this.playerIdBlack)
    },
  },
})

GameSchema.statics.findOrCreate = async (title: string): Promise<IGameDocument> => {
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    const game = new Game(title);
    return await GameModel.updateOrCreate(game, true)
  } else {
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result
  }
}

GameSchema.statics.updateOrCreate = async (game: Game, isNew: boolean = false): Promise<IGameDocument> => {
  return await GameModel.findOneAndUpdate(
    {title: game.title},
    Game.MapForDb(game),
    {new: true, upsert: isNew},
  ).exec();
}

GameSchema.statics.findGame = async (id: string): Promise<IGameDocument> => {
  if (Types.ObjectId.isValid(id)) {
    return await await GameModel.findById(id)
  }
}

GameSchema.statics.getGameList = async (userId: string): Promise<IGameDocument[]> => {
  return await GameModel.find()
    .and([
      {
        // Game must have an empty slot or the user must be in it.
        $or: [
          { $or: [{ playerIdWhite: null }, { playerIdBlack: null }] },
          { $or: [{ playerIdWhite: userId, playerIdBlack: userId }] },
        ],
      }, { inProgress: true },
    ])
    .select({ name: true, playerIdBlack: true, playerIdWhite: true })
    .exec()
}

GameSchema.statics.getAvailableGames = async (userId: string): Promise<IGameDocument[]> => {
  // Beautiful! Check for games that are neither full and doesn't contain active user already
  return await GameModel.find()
    .and([
      { $or: [{ playerIdWhite: null }, { playerIdBlack: null }] },
      { playerIdWhite: { $ne: userId } },
      { playerIdBlack: { $ne: userId } },
      { inProgress: true },
    ]).exec()
}

GameSchema.statics.getGames = async (ids: string[], inProgress: boolean): Promise<IGameDocument[]> => {
  return await GameModel.find({
    _id: {$in: ids},
    inProgress,
  }).exec()
}

export interface IGameDocument extends Majavashakki.IGame, Document {}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>
  updateOrCreate(game: Game, isNew?: boolean): Promise<IGameDocument>
  findGame(id: string): Promise<IGameDocument>
  getAvailableGames(userId: string): Promise<IGameDocument[]>
  getGames(ids: string[], inProgress: boolean): Promise<IGameDocument[]>
  getGames(userId: string): Promise<IGameDocument[]>
}

export const GameModel: IGameModel = model<IGameDocument, IGameModel>("GameModel", GameSchema)
