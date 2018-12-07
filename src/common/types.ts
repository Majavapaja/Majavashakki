import * as t from "io-ts"

const minLength = n => s => s.length >= n
const contains = x => xs => xs.indexOf(x) !== -1

export const UsernameType = t.refinement(t.string, minLength(1), "Username")
export const EmailType = t.refinement(t.string, contains("@"), "Email")
export const PasswordType = t.refinement(t.string, minLength(4), "Password")

export const GameNameType = t.refinement(t.string, minLength(1), "GameName")

export const RegisterRequestType = t.exact(t.type({
  name: UsernameType,
  email: EmailType,
  password: PasswordType,
}))

// tslint:disable-next-line no-empty-interface
export interface RegisterRequest extends t.TypeOf<typeof RegisterRequestType> {}

export const UserUpdateRequestType = t.exact(t.type({
  name: UsernameType,
  email: EmailType,
}))

// tslint:disable-next-line no-empty-interface
export interface UserUpdateRequest extends t.TypeOf<typeof UserUpdateRequestType> {}

export const CreateGameRequestType = t.exact(t.type({
  title: GameNameType,
}))

// tslint:disable-next-line no-empty-interface
export interface CreateGameRequest extends t.TypeOf<typeof CreateGameRequestType> {}

export interface ApiUser {
  id: string
  name: string
  email: string
}

export interface ApiGameInfo {
  id: string
  title: string
}
