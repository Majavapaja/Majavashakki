/* Defines user schema and model */

import {Document, Schema, SchemaOptions, Model, model} from "mongoose";

export interface IUserDocument extends IUser, Document {
  facebookId?: string;
  // Insert user methods etc
  // get games?
  // join sockets?
  // do the twist?
  logMe(greeting: string);
}

export interface IUserModel extends Model<IUserDocument> {
  findOrCreate(facebookId: string, callback: (err, user: IUser) => void);
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

UserSchema.statics.findOrCreate = (facebookId: string, callback: (err, user: IUser) => void) => {
  const userObj = new User();
  User.findOne({facebookId}, (err, result) => {
    if (!result) {
      console.log(`CREATING NEW USER ${facebookId}`);
      userObj.facebookId = facebookId;
      userObj.save(callback);
    } else {
      console.log(`FOUND EXISTING USER ${result.facebookId}`);
      callback(err, result);
    }
  });
};

UserSchema.methods.logMe = (greeting: string) => {
  console.log(`${greeting}, my name is: ${this.name}`);
};

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);
