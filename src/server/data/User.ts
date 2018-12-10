/* Defines user schema and model */

import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import Game from "../entities/Game"
import {RegisterRequest} from "../../common/types"
import * as _ from "lodash";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  name: string;
  games: string[];
  password: string;
}

export interface IUserDocument extends IUser, Document {
  facebookId?: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate(facebookId: string): Promise<IUserDocument>;
  save(user: global.IUserContract): Promise<IUserDocument>;
  addGame(userId: string, gameTitle: string): Promise<void>;
  validProfile(user: IUserDocument): boolean;
  registerUser(user: RegisterRequest): Promise<boolean>;
  getMyGames(userId: string, active?: boolean): Promise<string[]>;
}

const options: SchemaOptions = {timestamps: true};
export let UserSchema: Schema = new Schema({
  createdAt: Date,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  password: String,
  facebookId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  },
  games: {type: Array, default: []},
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

  console.log(`Find user by FBID '${facebookId}'`);

  const userObj = new User();
  const result = await User.findOne({facebookId}).exec();

  if (!result) {
    console.log(`CREATING NEW USER ${facebookId}`); // Please don't yell :(
    userObj.facebookId = facebookId;
    await userObj.save();
    return userObj;
  } else {
    console.log(`FOUND EXISTING USER ${result.facebookId} NAME: ${result.name}, ID: ${result._id}`);
    return result;
  }

};

UserSchema.statics.registerUser = async (user: RegisterRequest): Promise<boolean> => {
  console.log(`Find user by email '${user.email}'`);

  const userObj = new User();
  const result = await User.findOne({ email: user.email }).exec();

  if (!result) {
    console.log(`Registering user ${user}`);
    userObj.name = user.name
    userObj.email = user.email

    const saltRounds = 10
    userObj.password = await bcrypt.hash(user.password, saltRounds)

    await userObj.save();

    return true;
  } else {
    console.log(`User already exists ${result.email} name: ${result.name}, id: ${result._id}`);
    return false;
  }
}

UserSchema.statics.save = async (user: global.IUserContract) => {
  const doc = await User.findOneAndUpdate({_id: user.id}, {name: user.name, email: user.email}).exec();
  return doc;
};

UserSchema.statics.addGame = async (_id: string, gameTitle: string) => {
  const user = await User.findById(_id).exec();
  if (!user) {
    console.log(`No user found by ID ${_id}`);
    throw new Error(`Cannot add game because user was not found with ID ${_id}`)
  }

  console.log(`Adding game '${gameTitle}' for user ${user.name} (ID ${user._id})`);
  if (_.includes(user.games, gameTitle)) {
    console.log("Game already added, go on with your business");
    return;
  }
  user.games.push(gameTitle);
  await user.save();
  console.log("Added game");
}

UserSchema.statics.getMyGames = async (_id: string): Promise<string[]> => {
  const user = await User.findOne({_id}).exec();
  if (!user) throw new Error(`Invalid user id '${_id}' for fetching my games`);
  return user.games;
}

// Methods are used for instance of items
UserSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  const self = this as IUserDocument;
  return await bcrypt.compare(password, self.password)
};

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
