import * as http from "http";
import {resolve} from "path";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as passport from "passport";
import {Strategy as FbStrategy} from "passport-facebook";
import { Strategy as LocalStrategy } from "passport-local";
import * as sio from "socket.io";
import {MongooseClient} from "./data/MongooseClient";
import {User, IUserDocument} from "./data/User";

import {Game} from "./entities/GameRoom";
import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import {enableSessions, getSession} from "./session";
import {copy} from "../common/util";
const siteName = process.env.WEBSITE_SITE_NAME; // Azure default
const appRootUrl = siteName ? `https://${siteName}.azurewebsites.net` : "http://localhost:3000";
const app = express();
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

// Mitä tää tekee? :)
app.use(passport.initialize());

app.use(passport.session());

app.get("/", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  return next();
});

app.get("/login",
 passport.authenticate("facebook", { failureRedirect: "/error" }),
 (req, res) => { // Successful authentication, redirect home.
   res.redirect("/");
  }
);

const server = http.createServer(app);
io.attach(server);

app.use(express.static(resolve(__dirname, "../../dist")));
app.use(bodyParser.json())

const roomRepo = GameRoomsRepository.getInstance();

import {UserState} from "./entities/UserState";

app.post("/api/newuser", (req, res) => {
  const {session, body: {name}} = req
  const currentUser: IUserDocument = session.passport.user;
  console.log("New user received :" + currentUser.facebookId);
  User.updateName(currentUser._id, name);
  currentUser.name = name;
  res.send("OK")
})

app.get("/api/games", async (req, res) => {
 const openGames = await roomRepo.getAvailableGames();
 res.send(openGames);
});

app.post("/api/games", async (req, res) => {
  const {session, body: {name}} = req
  const game = await roomRepo.createRoom(name)
  // User.addGame(session.passport.user._id, name)
  if(!game) {
    res.status(400).send("Game exists with given name - ask admins to refactor this shit")
  } else {
    res.send(game)
  }
})

function initSockets() {
  io.on("connection", (socket: SocketIO.Socket) => {
    const session = getSession(socket.handshake);
    logSession("/socket.io", session);

    let state = null;

    socket.on("join-game", async (roomTitle) => {
      const game = await roomRepo.joinRoom(roomTitle, state);
      if (game) {
        User.addGame(state.id, game.title);
      }
    });

    socket.on("move", async (data) => {
      const game = await roomRepo.getGameRoom(state.currentRoom);
      const result = game.move(data.from, data.dest);
      roomRepo.saveGame(game);

      switch (result.kind) {
      case "error":
          return socket.emit("move_result", result);
      case "success":
          return io.to(game.title).emit("move_result", result);
      }
    });

    if (session.passport && session.passport.user && session.passport.user.name) {
      const name = session.passport.user.name
      // Skip login view - TODO routing for views and stop abusing sockets for app navigation...
      state = new UserState(name, socket, roomRepo.MainRoom, session.passport.user._id);
      socket.emit("login", name);
    }
  });
}

function initPassport(appUrl: string) {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(
    new FbStrategy({
      clientID: process.env.MajavashakkiFbClientId,
      clientSecret: process.env.MajavashakkiFbSecret,
      callbackURL: appUrl + "/login",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(`User '${profile.displayName}' logged in successfully.`);
      User.findOrCreate(profile.id).then((user) => {
        user.logMe("kekkeli");
        process.nextTick(() => done(null, user));
      });
    },
  ));

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

export const start = port => {
  server.listen(port, () => {
    console.log("Server listening at port %d", port);
  });
  return server;
};
