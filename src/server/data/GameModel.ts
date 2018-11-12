/* Defines user schema and model */
import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import {Game} from "../entities/Game";
import * as Entity from "../entities/DatabaseEntities"

export interface IGameDocument extends Entity.IGame, Document {
  denormalize(): global.IGameRef;
}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>;
  save(game: Entity.IGame, isNew?: boolean): Promise<IGameDocument>;
  findByTitle(title: string): Promise<IGameDocument>;
  getAvailableGames(userId: string): Promise<global.IGameRef[]>;
}

const options: SchemaOptions = {timestamps: true};
export let GameSchema: Schema = new Schema({
  createdAt: Date,
  title: String,
  currentTurn: String,
  playerIdWhite: String,
  playerIdBlack: String,
  pieces: Schema.Types.Mixed,
  moveHistory: Schema.Types.Mixed,
}, options);

GameSchema.statics.findOrCreate = async (title: string): Promise<IGameDocument> => {
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    console.log(`CREATING NEW GAME ${title}`);
    const game = new Game(title);
    const gameState: Entity.IGame = Game.MapForDb(game);
    return await GameModel.save(gameState, true);
  } else {
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result;
  }
};

GameSchema.statics.save = async (game: Entity.IGame, isNew: boolean = false): Promise<IGameDocument> => {
  console.log(`SAVING GAME ${game.title}`)
  return await GameModel.findOneAndUpdate({title: game.title}, game, {new: true, upsert: isNew}).exec();
};

GameSchema.statics.findByTitle = async (title: string): Promise<IGameDocument> => {
  console.log("Find by title: " + title)
  const gameState = await GameModel.findOne({title}).exec();
  if (!gameState) throw new Error("Peliä ei löywy!");
  return gameState;
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
