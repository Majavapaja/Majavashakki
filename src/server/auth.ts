import passport from "passport"
import { Strategy as FbStrategy } from "passport-facebook"
import { Strategy as LocalStrategy } from "passport-local"
import { User, LoginType } from "./models/User"

export function requireAuth(onFailure) {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      onFailure(req, res, next)
    }
  }
}

export const uiAuth = requireAuth((req, res, next) => res.redirect("/login"))
export const apiAuth = requireAuth((req, res, next) => res.status(401).send({error: "Login required"}))

export function initPassport(appUrl: string) {
  passport.serializeUser(async (user: any, done) => done(null, user._id))
  passport.deserializeUser(async (_id, done) => done(null, await User.findOne({_id})))

  // Get facebook authentication values from environment variables
  const facebookClientId = process.env.MajavashakkiFbClientId
  const facebookSecret = process.env.MajavashakkiFbSecret
  const isFacebookAuthEnabled = facebookClientId && facebookSecret

  if (isFacebookAuthEnabled) {
    passport.use(new FbStrategy({
        clientID: facebookClientId,
        clientSecret: facebookSecret,
        callbackURL: appUrl + "/authFacebook",
      },
      async (accessToken, refreshToken, profile, done) => {
          console.log(`User '${profile.displayName}' logged in successfully.`)

          try {
            let user = await User.findByLoginId(LoginType.Facebook, profile.id)

            if (!user) {
              user = await User.registerUser(profile.id, LoginType.Facebook)
            }

            done(null, user)
          } catch (err) {
            done(err)
          }
      },
    ))
  } else {
      console.warn("[WARNING] Facebook authentication was not enabled. Missing environment variables 'MajavashakkiFbClientId' or 'MajavashakkiFbSecret'")
  }

  passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findByLoginId(LoginType.Local, email)

      if (!user) {
        console.log(`User '${email}' tried to log in with invalid email`)
        return done(null, false, { message: "There is no account with this email. :O" });
      }

      const isValidPassword = await user.isCorrectPassword(password)

      if (!isValidPassword) {
        console.log(`User '${email}' tried to log in with invalid password`)
        return done(null, false, { message: "Invalid password, did you try 'salasana1'?" });
      }

      console.log(`User '${email}' logged in successfully`)
      return done(null, user);
    } catch (error) {
      return done(error)
    }
  }));
}
