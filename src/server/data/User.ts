/* Defines user schema and model */

import {Document, Schema, Model, model} from "mongoose";
import {RegisterRequest} from "../../common/types"
import * as _ from "lodash";
import bcrypt from "bcryptjs";
import { schemaOptions } from "../mongo"

const PASSWORD_SALT_ROUNDS = 10

export interface IUser {
  email: string;
  name: string;
  gameIds: string[];
  password: string;
}

export interface IUserDocument extends IUser, Document {
  facebookId?: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate(facebookId: string): Promise<IUserDocument>;
  save(user: global.IUserContract): Promise<IUserDocument>;
  addGame(userId: string, gameId: string): Promise<void>;
  validProfile(user: IUserDocument): boolean;
  registerUser(user: RegisterRequest): Promise<IUserDocument | undefined>;
  getMyGames(userId: string, active?: boolean): Promise<string[]>;
}

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
  gameIds: {type: Array, default: []},
}, schemaOptions({
  collection: "users",
}));

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

UserSchema.statics.registerUser = async (user: RegisterRequest): Promise<IUserDocument | undefined> => {
  const doc = new User();
  doc.name = user.name
  doc.email = user.email
  doc.password = await bcrypt.hash(user.password, PASSWORD_SALT_ROUNDS)
  return await doc.save();
}

UserSchema.statics.save = async (user: global.IUserContract): Promise<IUserDocument> => {
  return await User.findOneAndUpdate({_id: user.id}, {name: user.name, email: user.email}).exec();
};

UserSchema.statics.addGame = async (_id: string, gameId: string) => {
  const user = await User.findById(_id).exec();
  if (!user) {
    console.log(`No user found by ID ${_id}`);
    throw new Error(`Cannot add game because user was not found with ID ${_id}`)
  }

  if (_.includes(user.gameIds, gameId)) {
    console.log("Game already added, go on with your business");
    return;
  }
  user.gameIds.push(gameId)
  await user.save();
}

UserSchema.statics.getMyGames = async (_id: string): Promise<string[]> => {
  const user = await User.findOne({_id}).exec();
  if (!user) throw new Error(`Invalid user id '${_id}' for fetching my games`);
  return user.gameIds
}

// Methods are used for instance of items
UserSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  const self = this as IUserDocument;
  return await bcrypt.compare(password, self.password)
};

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
