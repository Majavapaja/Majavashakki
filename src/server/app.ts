import http from "http";
import {resolve} from "path";

import bodyParser from "body-parser";
import express from "express";
import passport from "passport";
import sio from "socket.io";
import {MongooseClient} from "./data/MongooseClient";
import { User, IUserDocument } from "./data/User";
import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import {enableSessions, getSession} from "./session";
import {copy} from "../common/util";
import * as Majavashakki from "../common/GamePieces"
import { initPassport } from "./auth"

const siteName = process.env.WEBSITE_SITE_NAME; // Azure default
const appRootUrl = siteName ? `https://${siteName}.azurewebsites.net` : "http://localhost:3000";
const app = express();

MongooseClient.InitMongoConnection();
initPassport(appRootUrl);

const io: SocketIO.Server = sio({transports: ["websocket"]});
enableSessions(app, io);
initSockets();

app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);
io.attach(server);

const uiAuth = requireAuth((req, res, next) =>
  res.redirect("/login"))

const apiAuth = requireAuth((req, res, next) =>
  res.status(401).send({error: "Login required"}))

app.get("/", uiAuth, (req, res, next) => {
  return User.validProfile(req.user) ? next() : res.redirect("/profile");
});

app.get("/authFacebook",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
)

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send("Authentication error")
    } else if (!user) {
      return res.status(401).send(info.message)
    } else {
      req.login(user, loginError => {
        if (loginError) return next(loginError)
        return res.redirect("/")
      })
    }
  })(req, res, next)
})

const roomRepo = GameRoomsRepository.getInstance();

app.get("/api/user", (req, res) => {
  const user = req.user;
  const result: global.IUserContract = {
    name: user ? user.name : "Anonymous",
    email: user ? user.email : undefined,
    loggedIn: Boolean(user)
  };
  res.set("Cache-Control", "no-cache");
  res.send(result);
});

app.post("/api/user", apiAuth, (req, res) => {
  const session = getSession(req);
  const user = req.body as global.IUserContract;
  if (!session) throw new Error("No session found, things are broken")

  const currentUser: IUserDocument = req.user
  console.log("New user received :" + currentUser.facebookId);
  User.updateName(currentUser._id, user.name);
  currentUser.name = user.name;
  res.send("OK")
})

app.post("/api/user/register", async (req, res) => {
  const user = req.body as global.IUserContract;
  console.log("New user received :" + JSON.stringify(user));

  const result = await User.registerUser(user);

  if (result) res.send("OK")
  else res.status(500).send({ error: "Couldn't create user" })
})

app.get("/api/games", apiAuth, async (req, res) => {
 const openGames = await roomRepo.getAvailableGames(req.user._id);
 res.send(openGames);
});

app.post("/api/games", apiAuth, async (req, res) => {
  const {session, body: {title}} = req
  const game = await roomRepo.createRoom(title)
  const socket = sessionSocketMap[session.id];
  // TODO this broadcast is not supported anymore? Does other users see new games when created?? Check if this is "oopsies".
  socket.broadcast.to(this.MainRoom).emit("game-created", game.title);
  res.send(game);
})

app.get("/api/games/get/:name", apiAuth, async (req, res) => {
  const {session, params: {name}} = req
  const socket = sessionSocketMap[session.id];

  // TODO: Check the user has permissions to the game

  const game = await roomRepo.getGameRoom(name);
  socket.join(game.title)
  // TODO Return lightweight interface instead?
  if (game) {
    res.send(game);
  } else {
    res.status(404).send({error: "Game not found"})
  }
})

app.get("/api/games/my-games", apiAuth, async (req, res) => {
  const {session, user} = req;
  const myGames = await User.getMyGames(user._id); // TODO active rule for fetch
  res.send(myGames);
})

app.post("/api/games/join", apiAuth, async (req, res) => {
  const {session, body: {title}} = req
  const socket = sessionSocketMap[session.id];
  const userId = req.user._id
  const game = await roomRepo.joinRoom(socket, title, userId) // TODO: Handle full room exception

  socket.leaveAll(); // TODO Move room data into some smart structure inside session when its needed (not yet)
  socket.join(title); // TODO we should use game ids
  res.send(game);
})

const sessionSocketMap = {};

function initSockets() {
  io.on("connection", (socket: SocketIO.Socket) => {
    const session = getSession(socket.handshake);
    sessionSocketMap[session.id] = socket;

    // TODO: Ensure that user is logged in before allowing socket connections

    const user = session.passport.user;

    socket.on("move", async (data) => {
      // TODO: Check the player is allowed to make moves in the game
      const game = await roomRepo.getGameRoom(data.gameName);

      if (!game.doesUserOwnPiece(user, data.from)) {
        return socket.emit("move_result", {
          status: Majavashakki.MoveStatus.Error,
          error: "Error 13: This is not your piece!"
        })
      }

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

// XXX: Not yet accessible in UI
app.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/login")
})
app.get("/login", serveUI)
app.get("/signup", serveUI)
// Important!! Resolve serving of static files before catch-em-all serve
app.use(express.static(resolve(__dirname, "../../dist")));
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