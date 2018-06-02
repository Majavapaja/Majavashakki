/* Defines user schema and model */

import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import { ObjectID } from "../../../node_modules/@types/bson/index";

export interface IUserDocument extends IUser, Document {
  facebookId?: string;
  // Insert user methods etc
  // get games?
  // join sockets?
  // do the twist?
  logMe(greeting: string);
  validatePassword(password: string);
}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate(facebookId: string, callback: (err, user: IUserDocument) => void);
  updateName(id: string|ObjectID, name: string);
  addGame(userId: string, gameName: string): Promise<void>;
}

const options: SchemaOptions = {timestamps: true};
export let UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  name: String,
  password: String,
  facebookId: String,
  games: Array,
}, options);

UserSchema.pre("save", (next) => {
  // Hash / Salt 'n' shit?
  next();
});

UserSchema.statics.findOrCreate = (facebookId: string, callback: (err, user: IUserDocument) => void) => {
  const userObj = new User();
  User.findOne({facebookId}, (err, result) => {
    if (!result) {
      console.log(`CREATING NEW USER ${facebookId}`);
      userObj.facebookId = facebookId;
      userObj.save(callback);
    } else {
      console.log(`FOUND EXISTING USER ${result.facebookId} NAME: ${result.name}, ID: ${result._id}`);
      callback(err, result);
    }
  });
};

UserSchema.statics.updateName = (_id: string|ObjectID, name: string) => {
  User.findOneAndUpdate({_id}, {name}, (err, doc, res) => {
    if (err) {
      console.log(`Updating username for ${_id} failed with_ ${err}`);
    }
  });
};

UserSchema.statics.addGame = async (_id: string, gameTitle: string) => {

  const user = await User.findById(_id).exec();

  if (!user) {
    console.log(`No user found by ID ${_id}`);
    return;
  }

  console.log(`Adding game '${gameTitle}' for user ${user.name}`);

  if (!user.games) {
    user.games = [];
  }
  if (user.games.indexOf(gameTitle) != -1) {
    console.log("Game already added, skipping");
    return;
  }
  user.games.push(gameTitle);
  await user.save();
  user.update(user);
  console.log("Added game");

}

UserSchema.methods.logMe = (greeting: string) => {
  console.log(`${greeting}, my name is: ${this.name}`);
};

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
