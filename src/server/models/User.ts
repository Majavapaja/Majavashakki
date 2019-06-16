import {Document, Schema, Model, model} from "mongoose"
import * as _ from "lodash"
import bcrypt from "bcryptjs"

const PASSWORD_SALT_ROUNDS = 10

export enum LoginType {
  Local = "Local",
  Facebook = "Facebook",
}

export interface ILogin {
  _id: string
  type: LoginType
  password?: string
}
const LoginSchema = new Schema({
  _id: String,
  type: {
    type: String,
    validate: {
      validator: value => Boolean(LoginType[value]),
      message: props => `${props.value} is not valid login type`,
    },
  },
  password: String,
})
export interface ILoginDocument extends ILogin, Document {
  // Defined ID here again, because TypeScript complains otherwise
  _id: string
}

export interface IUser {
  name: string
  email: string
  logins: ILogin[]
}
const UserSchema = new Schema({
  name: { type: String, index: true },
  email: { type: String, index: true},
  logins: [ LoginSchema ],
})
export interface IUserDocument extends IUser, Document {
  isCorrectPassword(password: string): Promise<boolean>
}

export interface IUserModel extends Model<IUserDocument> {
  save(user: global.IUserContract): Promise<IUserDocument>
  registerUser(
    id: string,
    loginType: LoginType,
    password?: string,
    email?: string,
    name?: string,
  ): Promise<IUserDocument | undefined>
  findByIds(ids: string[]): Promise<IUserDocument[]>
  findByLoginId(id: string): Promise<IUserDocument | undefined>
}

/* Middleware */

LoginSchema.pre("save", async function() {
  const self = this as ILoginDocument
  if (self.password && self.isModified("password")) {
    self.password = await bcrypt.hash(self.password, PASSWORD_SALT_ROUNDS)
  }
})

/** Statics */

UserSchema.statics.save = async (user: global.IUserContract): Promise<IUserDocument> => {
  return await User.findByIdAndUpdate(user.id, {name: user.name, email: user.email}).exec()
}

UserSchema.statics.registerUser = async (
  id: string,
  loginType: LoginType,
  password?: string,
  email?: string,
  name?: string,
): Promise<IUserDocument | undefined> => {
  const login = {
    _id: id,
    type: loginType,
    password,
  } as ILogin

  const user = {
    email,
    name,
    logins: [ login ],
  } as IUser

  const doc = new User(user)
  return await doc.save()
}

UserSchema.statics.findByIds = async (ids: string[]): Promise<IUserDocument[]> => {
  return await User.find({ _id: { $in: ids } }).exec()
}

UserSchema.statics.findByLoginId = async (id: string): Promise<IUserDocument> => {
  return await User.findOne({
    logins: {
      $elemMatch: {
        _id: id,
      },
    },
  })
}

/* Methods */

UserSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  const self = this as IUserDocument
  const login = self.logins.find(x => x.type === LoginType.Local)
  if (!login || !login.password) {
    console.log("User has no login with password, password can't be correct")
    return false
  }

  return await bcrypt.compare(password, login.password)
}

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema, "users");