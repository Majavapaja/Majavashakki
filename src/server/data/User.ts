/* Defines user schema and model */

import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import {IGameDocument} from "./GameModel";
import * as _ from "lodash";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  name: string;
  games?: global.IGameRef[];
  password: string;
}

export interface IUserDocument extends IUser, Document {
  facebookId?: string;
  // Insert user methods etc
  // get games?
  // join sockets?
  // do the twist?
  isCorrectPassword(password: string);
}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate(facebookId: string): Promise<IUserDocument>;
  save(user: global.IUserContract): Promise<IUserDocument>;
  addGame(userId: string, game: IGameDocument): Promise<global.IGameRef>;
  validProfile(user: IUserDocument): boolean;
  registerUser(newUser: global.IUserContract): Promise<boolean>;
  getMyGames(userId: string, active?: boolean): Promise<global.IGameRef[]>;
}

const options: SchemaOptions = {timestamps: true};
export let UserSchema: Schema = new Schema({
  createdAt: Date,
  email: {
    type: String,
    unique: true
  },
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

UserSchema.statics.registerUser = async (user: global.IUserContract): Promise<boolean> => {
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

UserSchema.statics.addGame = async (_id: string, game: IGameDocument) => {
  const user = await User.findById(_id).exec();
  if (!user) {
    console.log(`No user found by ID ${_id}`);
    throw new Error(`Cannot add game because user was not found with ID ${_id}`)
  }

  console.log(`Adding game '${game.title}' for user ${user.name} (ID ${user._id})`);
  const gameRef = game.denormalize();
  if (_.includes(user.games, gameRef)) {
    console.log("Game already added, go on with your business");
    return;
  }
  user.games.push(gameRef);
  await user.save();
  console.log("Added game");
}

UserSchema.statics.getMyGames = async (_id: string, active: boolean = true): Promise<global.IGameRef[]> => {
  const user = await User.findOne({_id}).exec();
  if (!user) throw new Error(`Invalid user id '${_id}' for fetching my games`);
  return user.games.filter(gameref => gameref.active);
}

// Methods are used for instance of items
UserSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  const self = this as IUserDocument;
  return await bcrypt.compare(password, self.password)
};

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
