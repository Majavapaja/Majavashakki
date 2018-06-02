import * as http from "http";
import {resolve} from "path";

import * as express from "express";
import * as passport from "passport";
import {Strategy as FbStrategy} from "passport-facebook";
import { Strategy as LocalStrategy } from "passport-local";
import * as sio from "socket.io";
import {MongooseClient} from "./data/MongooseClient";
import {User, IUserDocument} from "./data/User";

import {Game} from "./entities/GameRoom";
import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import {UserStatesRepository} from "./logic/UserStatesRepository";
import {enableSessions, getSession} from "./session";
import {copy} from "../common/util";
const siteName = process.env.WEBSITE_SITE_NAME; // Azure default
const appRootUrl = siteName ? `https://${siteName}.azurewebsites.net` : "http://localhost:3000";
const app = express();
MongooseClient.InitMongoConnection();
initPassport(appRootUrl);

const io: SocketIO.Server = sio({transports: ["websocket"]});
enableSessions(app, io);

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
  initSockets();
  return next();
});

app.get("/login", (req, res) =>
  // res.send("hello world");

 passport.authenticate("facebook", { failureRedirect: "/error" }),
 (req, res) => { // Successful authentication, redirect home.
   res.redirect("/");
}
);

const server = http.createServer(app);
io.attach(server);

app.use(express.static(resolve(__dirname, "../../dist")));

const roomRepo = GameRoomsRepository.getInstance();
const userStateRepo = UserStatesRepository.getInstance();

function initSockets() {
  io.on("connection", (socket: SocketIO.Socket) => {
    const session = getSession(socket.handshake);
    logSession("/socket.io", session);

    // User has logged in and entered username
    // Creates user state and updates name in database
    socket.on("new user", (username: string) => {
      const currentUser: IUserDocument = session.passport.user;
      console.log("New user received :" + currentUser.facebookId);
      User.updateName(currentUser._id, username);
      currentUser.name = username;
      userStateRepo.createUser(username, socket, roomRepo.MainRoom, currentUser._id);
    });

    socket.on("fetch-games", () => {
      socket.emit("update-games", roomRepo.getAvailableGames());
    });

    socket.on("create-game", (title: string) => {
      const state = userStateRepo.getState(socket.id);
      roomRepo.createRoom(title, state).then(g => g ? User.addGame(state.id, g.title) : null);
    });

    socket.on("join-game", (roomTitle) => {
      const state = userStateRepo.getState(socket.id);
      const game = roomRepo.joinRoom(roomTitle, state);
      if (game) {
        User.addGame(state.id, game.title);
      }
    });

    socket.on("move", (data) => {
      const game = roomRepo.getGameRoom(userStateRepo.getState(socket.id).currentRoom);
      const result = game.move(data.from, data.dest);
      roomRepo.saveGame(game);

      switch (result.kind) {
      case "error":
          return socket.emit("move_result", result);
      case "success":
          return io.to(game.title).emit("move_result", result);
      }
    });

    if (session.passport.user && session.passport.user.name) {
      // Skip login view - TODO routing for views and stop abusing sockets for app navigation...
      userStateRepo.createUser(session.passport.user.name, socket, roomRepo.MainRoom, session.passport.user._id);
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
