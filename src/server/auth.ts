import passport from "passport";
import { Strategy as FbStrategy } from "passport-facebook";
import { Strategy as LocalStrategy } from "passport-local";
import { User, IUserDocument } from "./data/User";

export function initPassport(appUrl: string) {
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((obj, done) => done(null, obj))

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
            const user = await User.findOrCreate(profile.id)
            done(null, user)
          } catch (err) {
            done(err)
          }
      }
    ))
  } else {
      console.warn("[WARNING] Facebook authentication was not enabled. Missing environment variables 'MajavashakkiFbClientId' or 'MajavashakkiFbSecret'")
  }

  passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    console.log(`User '${email}' trying to login.`)
    try {
      const user: IUserDocument = await User.findOne({ email })

      if (!user) {
        return done(null, false, { message: "There is no account with this email. :O" });
      }

      const isValidPassword = await user.isCorrectPassword(password)

      if (!isValidPassword) {
        return done(null, false, { message: "Invalid password, did you try 'salasana1'?" });
      }

      console.log("User logged in successfully")
      return done(null, user);
    } catch (error) {
        return done(error)
    }
  }));
}