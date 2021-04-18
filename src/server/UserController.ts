import { IUserDocument, User, LoginType } from "./models/User"
import passport from "passport";
import { jsonAPI, validate, ValidationError, writeJSON } from "./json"
import {
  ApiUser,
  RegisterRequestType, RegisterRequest,
  UserUpdateRequestType, UserUpdateRequest,
} from "../common/types"
import { isProd } from './util'

export default {
  getUser: jsonAPI<ApiUser | undefined>(async req => {
    const user = req.user as IUserDocument;
    if (user) {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    }
  }),

  postUser: jsonAPI<void>(async req => {
    const userUpdate = validate<UserUpdateRequest>(UserUpdateRequestType, req.body)
    const {_id} = req.user as IUserDocument
    try {
      console.log(`Updating user ${_id}:`, userUpdate);
      await User.findOneAndUpdate({_id}, userUpdate).exec()
    } catch (e) {
      if (isUniqueIndexViolation(e)) {
        throw new ValidationError([`Email ${userUpdate.email} is already in use`])
      }
      throw e
    }
  }),

  registerUser: jsonAPI<any>(async req => {
    const user = validate<RegisterRequest>(RegisterRequestType, req.body)

    try {
      console.log(`Registering user: ${user.email}`)
      if (await User.findByLoginId(LoginType.Local, user.email)) {
        throw new ValidationError([`Email '${user.email}' is already in use`])
      }

      const registeredUser = await User.registerUser(user.email, LoginType.Local, user.password, user.email, user.name)

      console.log(`Logging in user: ${registeredUser.email}`)
      const promise = new Promise((resolve, reject) => {
        req.login(registeredUser, loginError => {
          if (loginError) {
            console.log(`Login error ${loginError}`)
            reject("Couldn't log in")
          } else {
            resolve({ status: "OK" })
          }
        })
      })

      return promise;
    } catch (e) {
      console.log("ERROR Failed to register user:", e)
      throw e
    }
  }),

  loginUser: async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      console.log(err, user, info)
      if (err) {
        if (err instanceof ValidationError) {
          return writeJSON(res, 401, {error: "Unauthorized", ...err})
        } else {
          return writeJSON(res, 500, isProd()
            ? {error: "Internal Server Error"}
            : {error: "Internal Server Error", message: err.message}
          )
        }
      } else {
        req.login(user, loginError => {
          if (loginError) return next(loginError)
          return res.redirect("/")
        })
      }
    })(req, res, next)
  },

  loginFacebook: passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),

  logout: (req, res) => {
    req.logout()
    res.redirect("/login")
  },
}

function isUniqueIndexViolation(e) {
  return e.name === "MongoError" && e.code === 11000
}
