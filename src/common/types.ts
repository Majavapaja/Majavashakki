import * as t from "io-ts"

const minLength = n => s => s.length >= n
const contains = x => xs => xs.includes(x)

type Validator<T> = (val: T) => boolean
type ErrorFormatter<T> = (val: T) => string

const mkValidator = <T>(
  name: string,
  baseType: t.Type<T>,
  validators: Array<Validator<T>>,
  mkMessage: ErrorFormatter<T>
) =>
  new t.Type<T, T, unknown>(
    name,
    baseType.is,
    (u, c) =>
      baseType.validate(u, c).chain(val => {
        const valid = validators.every(v => v(val))
        return valid ? t.success(val) : t.failure(u, c, mkMessage(val))
      }),
    t.identity
  )

export const UsernameType = t.refinement(t.string, minLength(1), "Username")

export const EmailType = mkValidator<string>(
  "Email",
  t.string,
  [contains("@")],
  val => `Email '${val}' is invalid (should contain at least @ character)`
)

export const PasswordType = t.refinement(t.string, minLength(4), "Password")

export const GameNameType = t.refinement(t.string, minLength(1), "GameName")

export const RegisterRequestType = t.exact(
  t.type({
    name: UsernameType,
    email: EmailType,
    password: PasswordType,
  })
)

// tslint:disable-next-line no-empty-interface
export interface RegisterRequest extends t.TypeOf<typeof RegisterRequestType> {}

export const UserUpdateRequestType = t.exact(
  t.type({
    name: UsernameType,
    email: EmailType,
  })
)

// tslint:disable-next-line no-empty-interface
export interface UserUpdateRequest extends t.TypeOf<typeof UserUpdateRequestType> {}

export const CreateGameRequestType = t.exact(
  t.type({
    title: GameNameType,
  })
)

// tslint:disable-next-line no-empty-interface
export interface CreateGameRequest extends t.TypeOf<typeof CreateGameRequestType> {}

const PositionType = t.exact(
  t.type({
    row: t.string,
    col: t.string,
  })
)

export const MoveRequestType = t.exact(
  t.intersection([
    t.type({
      from: PositionType,
      dest: PositionType,
    }),
    t.partial({
      promotionType: t.string,
    }),
  ])
)

// tslint:disable-next-line no-empty-interface
export interface MoveRequest extends t.TypeOf<typeof MoveRequestType> {}

export interface ApiUser {
  id: string
  name: string
  email: string
}

export interface ApiGameInfo {
  id: string
  title: string
  playerWhite?: ApiPlayerDetails
  playerBlack?: ApiPlayerDetails
  inProgress: boolean
}

export interface ApiPlayerDetails {
  id: string
  name: string
}
