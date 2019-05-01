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
  logins: LoginId[];
}

export enum LoginType {
  Local = "local",
  Facebook = "facebook",
}

export class LoginId {
  public id: string;
  public type: LoginType;
  public primary: boolean;
  public password: string;

  public constructor(id: string, type: LoginType, password: string = null, primary: boolean = true) {
    this.id = id;
    this.type = type;
    this.primary = primary;
    this.password = password;
  }
}

export interface IUserDocument extends IUser, Document {
  isCorrectPassword(password: string): Promise<boolean>;
  primaryId(): LoginId;
}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate(facebookId: string): Promise<IUserDocument>;
  save(user: global.IUserContract): Promise<IUserDocument>;
  addGame(userId: string, gameId: string): Promise<void>;
  validProfile(user: IUserDocument): boolean;
  registerUser(user: RegisterRequest): Promise<IUserDocument | undefined>;
  getMyGames(userId: string): Promise<string[]>;
  findByIds(ids: string[]): Promise<IUserDocument[]>
  findByLoginEmail(email: string): Promise<IUserDocument | undefined>
}

export let UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  name: String,
  password: String,
  logins: {type: Array, default: []},
  gameIds: {type: Array, default: []},
}, schemaOptions({
  collection: "users",
}));

// TODO passport session doesn't get methods set by mongoose for IUserDocument instances via UserSchema.methods...
// unclear, if functions can be serialized / deserialized for passport session at all
UserSchema.statics.validProfile = (user: IUserDocument): boolean => {
  return !!user.name;
}

// TODO refactor local and facebook approaches into unified model
UserSchema.statics.findOrCreate = async (facebookId: string): Promise<IUserDocument> => {
  console.log(`Find user by FBID '${facebookId}'`);

  const userObj = new User();
  const result = await User.findOne({"logins.id": facebookId}).exec();

  if (!result) {
    console.log(`CREATING NEW USER ${facebookId}`); // Please don't yell :(
    const newLogin = new LoginId(facebookId, LoginType.Facebook);
    userObj.logins.push(newLogin);
    await userObj.save();
    return userObj;
  } else {
    console.log(`FOUND EXISTING USER ${facebookId} NAME: ${result.name}, ID: ${result._id}`);
    return result;
  }
};

UserSchema.statics.registerUser = async (user: RegisterRequest): Promise<IUserDocument | undefined> => {
  const doc = new User();
  doc.name = user.name
  doc.email = user.email
  const password = await bcrypt.hash(user.password, PASSWORD_SALT_ROUNDS)
  const newLogin = new LoginId(user.email, LoginType.Local, password)
  doc.logins.push(newLogin);
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

UserSchema.statics.findByIds = async (ids: string[]): Promise<IUserDocument[]> => {
  return await User.find({_id: {$in: ids}}).exec()
}

UserSchema.statics.findByLoginEmail = async (email: string): Promise<IUserDocument> => {
  return await User.findOne({
    logins: {
      $elemMatch: {
        type: LoginType.Local,
        id: email,
      },
    },
  })
}

// Methods are used for instance of items
UserSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  const self = this as IUserDocument;
  return await bcrypt.compare(password, self.primaryId().password)
};

UserSchema.methods.primaryId = function(): LoginId {
  const self = this as IUserDocument;
  return self.logins.find(x => x.primary);
}

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
