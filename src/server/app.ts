import * as http from "http";
import {resolve} from "path";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as passport from "passport";
import {Strategy as FbStrategy} from "passport-facebook";
import { Strategy as LocalStrategy } from "passport-local";
import * as sio from "socket.io";
import {MongooseClient} from "./data/MongooseClient";
import {User, IUserDocument, IUser} from "./data/User";

import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import {enableSessions, getSession} from "./session";
import {copy} from "../common/util";
import * as Majavashakki from "../common/GamePieces"

const siteName = process.env.WEBSITE_SITE_NAME; // Azure default
const appRootUrl = siteName ? `https://${siteName}.azurewebsites.net` : "http://localhost:3000";
const app = express();

// Get facebook authentication values from environment variables
const facebookClientId = process.env.MajavashakkiFbClientId
const facebookSecret = process.env.MajavashakkiFbSecret
const isFacebookAuthEnabled = facebookClientId && facebookSecret

MongooseClient.InitMongoConnection();
initPassport(appRootUrl);

const io: SocketIO.Server = sio({transports: ["websocket"]});
enableSessions(app, io);
initSockets();

const logSession = (path, session) => {
  const withoutCookie = copy(session);
  delete withoutCookie.cookie;
  console.log(`[${session.id}] ${path} ${JSON.stringify(withoutCookie)}`);
};

app.use((req, res, next) => {
  logSession(req.path, getSession(req));
  next();
});

app.use(passport.initialize());
app.use(passport.session());

const uiAuth = requireAuth((req, res, next) =>
  res.redirect("/login"))

const apiAuth = requireAuth((req, res, next) =>
  res.status(401).send({error: "Login required"}))

app.get("/", uiAuth, (req, res, next) => {
  const session = getSession(req)
  return User.validProfile(session.passport.user) ? next() : res.redirect("/profile");
});

app.get("/authFacebook",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
)

const server = http.createServer(app);
io.attach(server);

app.use(express.static(resolve(__dirname, "../../dist")));
app.use(bodyParser.json())

const roomRepo = GameRoomsRepository.getInstance();

app.get("/api/user", (req, res) => {
  const user = req.user;
  const result = {
    loggedIn: Boolean(user),
    name: user ? user.name : "Anonymous",
  };
  res.set("Cache-Control", "no-cache");
  res.send(result);
});

app.post("/api/user", apiAuth, (req, res) => {
  const {session, body: {name}} = req
  if (!session) throw new Error("No session found, things are broken")

  const currentUser: IUserDocument = session.passport.user;
  console.log("New user received :" + currentUser.facebookId);
  User.updateName(currentUser._id, name);
  currentUser.name = name;
  res.send("OK")
})

app.post("/api/user/register", async (req, res) => {
  const { body: { username, password, email } } = req
  const newUser: IUser = { name: username, email, password };
  console.log("New user received :" + newUser);

  const result = await User.registerUser(newUser);

  if (result) res.send("OK")
  else res.status(500).send({ error: "Couldn't create user" })
})

app.get("/api/games", apiAuth, async (req, res) => {
 const openGames = await roomRepo.getAvailableGames();
 res.send(openGames);
});

app.post("/api/games", apiAuth, async (req, res) => {
  const {session, body: {name}} = req
  const game = await roomRepo.createRoom(name)
  const socket = sessionSocketMap[session.id];
  socket.broadcast.to(this.MainRoom).emit("game-created", game.title);
  // TODO check do we leak mongo document data for client? (origin IGameDocument)
  res.send(game)
})

app.get("/api/games/get/:name", apiAuth, async (req, res) => {
  const {session, params: {name}} = req
  const socket = sessionSocketMap[session.id];

  // TODO: Check the user has permissions to the game

  const game = await roomRepo.getGameRoom(name);
  socket.join(game.title)
  if (game) {
    res.send(game);
  } else {
    res.status(404).send({error: "Game not found"})
  }
})

app.post("/api/games/join", apiAuth, async (req, res) => {
  const {session, body: {name}} = req
  const socket = sessionSocketMap[session.id];
  const userId = session.passport.user._id;
  const game = await roomRepo.joinRoom(name, userId) // TODO: Handle full room exception
  await User.addGame(userId, game.title)
  socket.leaveAll(); // TODO Move room data into some smart structure inside session when its needed (not yet)
  socket.join(name); // TODO we should use game ids
  socket.emit("game-joined", game.board.pieces); // TODO return response instead of socket communication
  if (game.isFull()) {
    socket.broadcast.to(this.MainRoom).emit("game-full");
  }
  res.send(game);
})

const sessionSocketMap = {};

function initSockets() {
  io.on("connection", (socket: SocketIO.Socket) => {
    const session = getSession(socket.handshake);
    logSession("/socket.io", session);
    sessionSocketMap[session.id] = socket;

    socket.on("move", async (data) => {
      // TODO: Check the player is allowed to make moves in the game
      const game = await roomRepo.getGameRoom(data.gameName);
      const move = game.move(data.from, data.dest);
      await roomRepo.saveGame(game);

      if (move.status === Majavashakki.MoveStatus.Error) {
        return socket.emit("move_result", move);
      } else {
        return io.to(game.title).emit("move_result", move);
      }
    });
  });
}

function initPassport(appUrl: string) {
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((obj, done) => done(null, obj))

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
        console.log(user)
        user.logMe("kekkeli")
        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  ))
  } else {
    console.warn("[WARNING] Facebook authentication was not enabled. Missing environment variables 'MajavashakkiFbClientId' or 'MajavashakkiFbSecret'")
  }

  // passport.use(
  //   new LocalStrategy((email, password, done) => {
  //     console.log(`User ${email} trying to login with local strategy`)
  //     User.findOne({ email }, (err, user) => {
  //       if (err) { return done(err); } // Pilikseen meni, yllätys!
  //       if (!user) {
  //         return done(null, false, { message: 'Incorrect user.' });
  //       }

  //       if (!user.validPassword(password)) {
  //         return done(null, false, { message: 'Incorrect password.' });
  //       }
  //       return done(null, false, { message: 'Incorrect password.' });
  //     });
  //   }
  // ));
}

// XXX: Not yet accessible in UI
app.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})
app.get("/login", serveUI)
app.get("/signup", serveUI)
app.get("*", uiAuth, serveUI)

function serveUI(req, res) {
  res.sendFile(resolve(__dirname, "../../dist/index.html"));
}

function requireAuth(onFailure) {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      onFailure(req, res, next)
    }
  }
}

export const start = port => {
  server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
  return server;
};
