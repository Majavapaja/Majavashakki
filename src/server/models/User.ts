import {Document, Schema, Model, model} from "mongoose"
import * as _ from "lodash"
import bcrypt from "bcryptjs"

const PASSWORD_SALT_ROUNDS = 10

export enum LoginType {
  Local = "local",
  Facebook = "facebook",
}

export interface ILogin {
  id: string
  type: LoginType
  primary: boolean
  password?: string
}
const LoginSchema = new Schema({
  id: { type: String, index: true, unique: true },
  type: {
    type: String,
    validate: {
      validator: value => Boolean(LoginType[value]),
      message: props => `${props.value} is not valid login type`,
    },
  },
  primary: Boolean,
  password: String,
})

export interface IUser {
  name: string
  email: string
  logins: ILogin[]
}
const UserSchema = new Schema({
  name: { type: String, index: true },
  email: String,
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
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, PASSWORD_SALT_ROUNDS)
  }
})

/** Statics */

UserSchema.statics.save = async (user: global.IUserContract): Promise<IUserDocument> => {
  return await User.findOneAndUpdate({_id: user.id}, {name: user.name, email: user.email}).exec()
}

UserSchema.statics.registerUser = async (
  id: string,
  loginType: LoginType,
  password?: string,
  email?: string,
  name?: string,
): Promise<IUserDocument | undefined> => {
  const login = {
    id,
    type: loginType,
    password,
    primary: true,
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
        id,
      },
    },
  })
}

/* Methods */

UserSchema.methods.isCorrectPassword = async function(password: string): Promise<boolean> {
  const self = this as IUserDocument
  const primaryLogin = self.logins.find(x => x.primary)
  if (!primaryLogin || !primaryLogin.password) {
    console.log("No primary login with password!")
    // TODO: Throw error instead of console.log?
    // TODO: Is this even a valid situation? Does the code even ever go here?
    return false
  }

  return await bcrypt.compare(password, primaryLogin.password)
}

export const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema, "users");