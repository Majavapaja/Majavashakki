/* Defines user schema and model */
import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import { ObjectID } from "../../../node_modules/@types/bson/index";

export interface IGameDocument extends Majavashakki.IGame, Document {

}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>;
  save(game: Majavashakki.IGame);
  findByTitle(title: string) : Promise<IGameDocument>;
  getAvailableGames(): Promise<IGameDocument[]>;
}

const options: SchemaOptions = {timestamps: true};
export let GameSchema: Schema = new Schema({
  createdAt: Date,

}, options);

GameSchema.statics.findOrCreate = async (title: string) => {
  const gameObj = new GameModel();
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    console.log(`CREATING NEW GAME ${title}`);
    gameObj.title = title;
    await gameObj.save();
    return gameObj;
  } else {
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result;
  }
};

GameSchema.statics.save = (game: Majavashakki.IGame) => {
  GameModel.findOneAndUpdate({title: game.title}, game, (err, doc, res) => {
    if (err) {
      console.log(`Updating username for ${game.title} failed with_ ${err}`);
    }
  });
};

GameSchema.statics.findByTitle = async (title: string): Promise<IGameDocument> => {
  var gameState = await GameModel.findOne({title}).exec();
  if (!gameState) throw new Error("Peliä ei löywy!");

  return gameState;
}

GameSchema.statics.getAvailableGames = async (): Promise<IGameDocument[]> => {
  return GameModel.find({$or: [{playerIdWhite: null}, {playerIdBlack: null}]}).exec();
}

export const GameModel: IGameModel = model<IGameDocument, IGameModel>("GameModel", GameSchema);