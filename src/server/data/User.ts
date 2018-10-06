/* Defines user schema and model */

import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import { ObjectID } from "../../../node_modules/@types/bson/index";

interface IUser {
  email: string;
  name: string;
  games?: string[];
}

export interface IUserDocument extends IUser, Document {
  facebookId?: string;
  // Insert user methods etc
  // get games?
  // join sockets?
  // do the twist?
  logMe(greeting: string);
  isProfileComplete(): boolean;
  validatePassword(password: string);
}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate(facebookId: string): Promise<IUserDocument>;
  updateName(id: string|ObjectID, name: string);
  addGame(userId: string, gameName: string): Promise<void>;
  validProfile(user: IUserDocument): boolean;
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

// Statics can be called straight from the model (find, search, create)

// TODO passport session doesn't get methods set by mongoose for IUserDocument instances via UserSchema.methods...
// unclear, if functions can be serialized / deserialized for passport session at all
UserSchema.statics.validProfile = (user: IUserDocument): boolean => {
  return !!user.name;
}

UserSchema.statics.findOrCreate = async (facebookId: string): Promise<IUserDocument> => {
  const userObj = new User();
  const result = await User.findOne({facebookId}).exec();

  if (!result) {
    console.log(`CREATING NEW USER ${facebookId}`);
    userObj.facebookId = facebookId;
    await userObj.save();
    return userObj;
  } else {
    console.log(`FOUND EXISTING USER ${result.facebookId} NAME: ${result.name}, ID: ${result._id}`);
    return result;
  }

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
  if (user.games.indexOf(gameTitle) !== -1) {
    console.log("Game already added, skipping");
    return;
  }
  user.games.push(gameTitle);
  await user.save();
  user.update(user);
  console.log("Added game");

}

// Methods are used for instance of items
UserSchema.methods.logMe = function logMe(greeting: string) {
  const self = this as IUserDocument;
  console.log(`${greeting}, my name is: ${self.name}`);
};

// WHY ARE THESE NOT APPLIED FOR USER OBJECT IN PASSPORT SESSION !? WHO AND WHEN IS THAT BASTARD GIVEN FOR PASSPORT?
// IN passport.serialize we are already missing these methods. HOW DOES PASSPORT FETCH THE USER OBJECT?
UserSchema.methods.isProfileComplete = function isProfileComplete() {
  // TODO later on email
  const self = this as IUserDocument;
  return !!self.name;
}

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
