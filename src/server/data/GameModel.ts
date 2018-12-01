/* Defines user schema and model */
import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import Game from "../entities/Game";
import * as Majavashakki from "../../common/GamePieces";

export interface IGameDocument extends Majavashakki.IGame, Document {
  denormalize(): global.IGameRef;
}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<Game>;
  save(game: Game, isNew?: boolean): Promise<Game>;
  findByTitle(title: string): Promise<Game>;
  getAvailableGames(userId: string): Promise<global.IGameRef[]>;
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

GameSchema.statics.findOrCreate = async (title: string): Promise<Game> => {
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    console.log(`CREATING NEW GAME ${title}`);
    const game = new Game(title);
    return await GameModel.save(game, true);
  } else {
    console.log(result.toObject())
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return Game.MapFromDb(result.toObject());
  }
};

GameSchema.statics.save = async (game: Game, isNew: boolean = false): Promise<Game> => {
  console.log(`SAVING GAME ${game.title}`)
  const gameAsJson = Game.MapForDb(game)
  console.log("gameAsJson", gameAsJson)
  const doc = await GameModel.findOneAndUpdate({title: game.title}, gameAsJson, {new: true, upsert: isNew}).exec();
  return Game.MapFromDb(doc.toObject())
};

GameSchema.statics.findByTitle = async (title: string): Promise<Game> => {
  console.log("Find by title: " + title)
  const gameState = await GameModel.findOne({title}).exec();
  if (!gameState) throw new Error("Peliä ei löywy!");
  return Game.MapFromDb(gameState.toObject());
}

GameSchema.statics.getAvailableGames = async (userId: string): Promise<global.IGameRef[]> => {
  // Beautiful! Check for games that are neither full and doesn't contain active user already
  const games = await GameModel.find()
    .and([
      {$or: [{playerIdWhite: null}, {playerIdBlack: null}]},
      {playerIdWhite: { $ne: userId }},
      {playerIdBlack: { $ne: userId }}
    ]).exec();
  return games.map((doc) => doc.denormalize());
}

// Methods are used for instance of items
GameSchema.methods.denormalize = function(): global.IGameRef {
  const self = this as IGameDocument;
  return {ref: self._id, title: self.title, active: true};
};

export const GameModel: IGameModel = model<IGameDocument, IGameModel>("GameModel", GameSchema);
