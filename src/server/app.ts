// Import external modules
import * as express from "express";
import * as sio from "socket.io";
// Import node core modules
import * as http from "http";
import * as path from "path";
// Import custom components
import {Game} from "./entities/GameRoom";
import {Board} from "./logic/board";
import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import {UserStatesRepository} from "./logic/UserStatesRepository";


var app = express();
var server = http.createServer(app);
var io: SocketIO.Server = sio({transports:['websocket']});
io.attach(server);
var port = process.env.PORT || 3000;

// ################ Routing ################
app.use(express.static(path.resolve('dist/public')));

// Singleton repository references
const roomRepo = GameRoomsRepository.getInstance();
const userStateRepo = UserStatesRepository.getInstance();

io.on('connection', function (socket: SocketIO.Socket) {

  socket.on("new user", function (username: string) { // TODO make proper stuff when auth is introduced
    userStateRepo.createUser(username, socket, roomRepo.MainRoom);
    // TODO board probably needs rethinking and refactoring. Why are we creating instance in socket connection?
    // use repository approach as with game and userstate?
    let board = new Board(userStateRepo.getState(socket.id));
  });

  socket.on("fetch-games", function () {
    socket.emit("update-games", roomRepo.getAvailableGames());
  })

  socket.on("create-game", function (title: string) {
    roomRepo.createRoom(title, userStateRepo.getState(socket.id));
  });

  socket.on("join-game", function (roomTitle){
    roomRepo.joinRoom(roomTitle, userStateRepo.getState(socket.id));
  });

});

module.exports = () => {
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });
}
