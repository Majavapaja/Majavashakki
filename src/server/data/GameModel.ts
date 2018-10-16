/* Defines user schema and model */
import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import {Game} from "../entities/GameRoom";
import * as Majavashakki from "../../common/GamePieces"

export interface IGameDocument extends Majavashakki.IGame, Document {
  denormalize(): IGameRef;
}

export interface IGameRef {
  ref: Schema.Types.ObjectId;
  title: string;
}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>;
  save(game: Majavashakki.IGame, isNew?: boolean): Promise<IGameDocument>;
  findByTitle(title: string): Promise<IGameDocument>;
  getAvailableGames(): Promise<IGameDocument[]>;
}

const options: SchemaOptions = {timestamps: true};
export let GameSchema: Schema = new Schema({
  title: String,
  playerIdWhite: String,
  playerIdBlack: String,
  board: Schema.Types.Mixed,
  createdAt: Date,

}, options);

GameSchema.statics.findOrCreate = async (title: string): Promise<IGameDocument> => {
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    console.log(`CREATING NEW GAME ${title}`);
    const game = new Game(title);
    const gameState = Game.MapForDb(game);
    return await GameModel.save(gameState, true);
  } else {
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result;
  }
};

GameSchema.statics.save = async (game: Majavashakki.IGame, isNew: boolean = false): Promise<IGameDocument> => {
  console.log(`SAVING GAME ${game.title}`)
  return await GameModel.findOneAndUpdate({title: game.title}, game, {new: true, upsert: isNew}).exec();
};

GameSchema.statics.findByTitle = async (title: string): Promise<IGameDocument> => {
  console.log("Find by title: " + title)
  const gameState = await GameModel.findOne({title}).exec();
  if (!gameState) throw new Error("Peliä ei löywy!");
  return gameState;
}

GameSchema.statics.getAvailableGames = async (): Promise<IGameDocument[]> => {
  return await GameModel.find({$or: [{playerIdWhite: null}, {playerIdBlack: null}]}).exec();
}

// Methods are used for instance of items
GameSchema.methods.denormalize = function(): IGameRef {
  const self = this as IGameDocument;
  return {ref: self._id, title: self.title};
};

export const GameModel: IGameModel = model<IGameDocument, IGameModel>("GameModel", GameSchema);
