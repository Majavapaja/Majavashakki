/* Defines user schema and model */
import {Document, Schema, SchemaOptions, Model, model, Types} from "mongoose";
import Game from "../entities/Game";
import * as Majavashakki from "../../common/GamePieces";

export interface IGameDocument extends Majavashakki.IGame, Document {
  denormalize(): global.IGameRef;
}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>;
  save(game: Game, isNew?: boolean): Promise<IGameDocument>;
  findByTitle(title: string): Promise<IGameDocument>;
  findByIdOrTitle(idOrTitle: string): Promise<IGameDocument>;
  getAvailableGames(userId: string): Promise<IGameDocument[]>;
  getGamesWithTitles(titles: string[]): Promise<IGameDocument[]>;
}

const options: SchemaOptions = {timestamps: true};
export let GameSchema: Schema = new Schema({
  createdAt: Date,
  title: {type: String, unique: true},
  currentTurn: String,
  playerIdWhite: String,
  playerIdBlack: String,
  board: Schema.Types.Mixed,
}, options);

GameSchema.statics.findOrCreate = async (title: string): Promise<IGameDocument> => {
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    console.log(`CREATING NEW GAME ${title}`);
    const game = new Game(title);
    return await GameModel.save(game, true);
  } else {
    console.log(result.toObject())
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result
  }
};

GameSchema.statics.save = async (game: Game, isNew: boolean = false): Promise<IGameDocument> => {
  console.log(`SAVING GAME ${game.title}`)
  const gameAsJson = Game.MapForDb(game)
  console.log("gameAsJson", gameAsJson)
  return await GameModel.findOneAndUpdate({title: game.title}, gameAsJson, {new: true, upsert: isNew}).exec();
};

GameSchema.statics.findByTitle = async (title: string): Promise<IGameDocument> => {
  return await GameModel.findOne({title}).exec();
}

GameSchema.statics.findByIdOrTitle = async (idOrTitle: string): Promise<IGameDocument> => {
  if (Types.ObjectId.isValid(idOrTitle)) {
    const game = await await GameModel.findById(idOrTitle);
    if (game) return game
  }

  return await GameModel.findByTitle(idOrTitle);
}

GameSchema.statics.getAvailableGames = async (userId: string): Promise<IGameDocument[]> => {
  // Beautiful! Check for games that are neither full and doesn't contain active user already
  return await GameModel.find()
    .and([
      {$or: [{playerIdWhite: null}, {playerIdBlack: null}]},
      {playerIdWhite: { $ne: userId }},
      {playerIdBlack: { $ne: userId }},
    ]).exec();
}

GameSchema.statics.getGamesWithTitles = async (titles: string[]): Promise<IGameDocument[]> => {
  return await GameModel.find({title: {$in: titles}}).exec()
}

// Methods are used for instance of items
GameSchema.methods.denormalize = function(): global.IGameRef {
  const self = this as IGameDocument;
  return {ref: self._id, title: self.title, active: true};
};

export const GameModel: IGameModel = model<IGameDocument, IGameModel>("GameModel", GameSchema);
