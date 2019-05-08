/* Defines user schema and model */
import {Document, Schema, Model, model, Types} from "mongoose";
import Game from "../entities/Game";
import * as Majavashakki from "../../common/GamePieces";
import { schemaOptions } from "../mongo"

export interface IGameDocument extends Majavashakki.IGame, Document {}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>;
  save(game: Game, isNew?: boolean): Promise<IGameDocument>;
  findGame(id: string): Promise<IGameDocument>;
  getAvailableGames(userId: string): Promise<IGameDocument[]>;
  getGames(ids: string[], inProgress: boolean): Promise<IGameDocument[]>;
}

export let GameSchema: Schema = new Schema({
  createdAt: Date,
  title: {type: String, unique: true},
  currentTurn: String,
  playerIdWhite: String,
  playerIdBlack: String,
  board: Schema.Types.Mixed,
  inProgress: Boolean,
  surrenderer: {
    type: String,
    validate: function(surrenderer) {
      return !surrenderer || (surrenderer === this.playerIdWhite || surrenderer === this.playerIdBlack)
    },
  },
}, schemaOptions({
  collection: "gamemodels",
}));

GameSchema.statics.findOrCreate = async (title: string): Promise<IGameDocument> => {
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    const game = new Game(title);
    return await GameModel.save(game, true);
  } else {
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result
  }
};

GameSchema.statics.save = async (game: Game, isNew: boolean = false): Promise<IGameDocument> => {
  return await GameModel.findOneAndUpdate(
    {title: game.title},
    Game.MapForDb(game),
    {new: true, upsert: isNew},
  ).exec();
};

GameSchema.statics.findGame = async (id: string): Promise<IGameDocument> => {
  if (Types.ObjectId.isValid(id)) {
    return await await GameModel.findById(id);
  }
}

GameSchema.statics.getAvailableGames = async (userId: string): Promise<IGameDocument[]> => {
  // Beautiful! Check for games that are neither full and doesn't contain active user already
  return await GameModel.find()
    .and([
      {$or: [{playerIdWhite: null}, {playerIdBlack: null}]},
      {playerIdWhite: { $ne: userId }},
      {playerIdBlack: { $ne: userId }},
      {inProgress: true},
    ]).exec();
}

GameSchema.statics.getGames = async (ids: string[], inProgress: boolean): Promise<IGameDocument[]> => {
  return await GameModel.find({
    _id: {$in: ids},
    inProgress,
  }).exec()
}

export const GameModel: IGameModel = model<IGameDocument, IGameModel>("GameModel", GameSchema);
