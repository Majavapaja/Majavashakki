import * as http from "http";
import * as path from "path";

import * as express from "express";
import * as sio from "socket.io";

import {Game} from "./entities/GameRoom";
import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import {UserStatesRepository} from "./logic/UserStatesRepository";

const app = express();
const server = http.createServer(app);
const io: SocketIO.Server = sio({transports: ["websocket"]});
io.attach(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve("dist/public")));

const roomRepo = GameRoomsRepository.getInstance();
const userStateRepo = UserStatesRepository.getInstance();

io.on("connection", (socket: SocketIO.Socket) => {

  socket.on("new user", (username: string) => {
    userStateRepo.createUser(username, socket, roomRepo.MainRoom);
  });

  socket.on("fetch-games", () => {
    socket.emit("update-games", roomRepo.getAvailableGames());
  });

  socket.on("create-game", (title: string) => {
    roomRepo.createRoom(title, userStateRepo.getState(socket.id));
  });

  socket.on("join-game", (roomTitle) => {
    roomRepo.joinRoom(roomTitle, userStateRepo.getState(socket.id));
  });

  socket.on("move", (data) => {
    const game = roomRepo.getGameRoom(userStateRepo.getState(socket.id).currentRoom);
    const result = game.move(data.from, data.dest);

    switch (result.kind) {
    case "error":
        return socket.emit("move_result", result);
    case "success":
        return io.to(game.title).emit("move_result", result);
    }
  });

});

export default () => {
  server.listen(port, () => {
    console.log("Server listening at port %d", port);
  });
};
