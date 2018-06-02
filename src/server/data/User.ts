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
  addGame(userId: string, gameName: string);
}

const options: SchemaOptions = {timestamps: true};
export let UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  name: String,
  password: String,
  facebookId: String,
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

  //const doc = await User.findOne({id}).exec();

  User.findOne({_id}, (err, doc) => {
    if (err) {
      console.log(`Updating games list for ${_id} failed with_ ${err}`);
      return;
    }
    if (!doc) {
      console.log(`No user found by ID ${_id}`);
      return;
    }

    console.log(`Adding game '${gameTitle}' for user ${doc.name}`);

    if (!doc.games) {
      doc.games = [];
    }
    if (doc.games.indexOf(gameTitle) != -1) {
      console.log("Game already added, skipping");
      return;
    }
    doc.games.push(gameTitle);
    doc.save();
    console.log("Added game");
  });

}

UserSchema.methods.logMe = (greeting: string) => {
  console.log(`${greeting}, my name is: ${this.name}`);
};

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
