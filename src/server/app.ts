// Import external modules
import * as express from "express";
import * as sio from "socket.io";
// Import node core modules
import * as http from "http";
import * as path from "path";
// Import custom components
import {Game} from "./entities/GameRoom";
import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import {UserStatesRepository} from "./logic/UserStatesRepository";

// ################ Server base ################
var app = express();
var server = http.createServer(app);
var io: SocketIO.Server = sio({transports:['websocket']});
io.attach(server);
var port = process.env.PORT || 3000;

// ################ Routing ################
app.use(express.static(path.resolve('dist/public')));

// ################ Server constants ################
const roomRepo = GameRoomsRepository.getInstance();
const userStateRepo = UserStatesRepository.getInstance();

// ################ Socket event bindings ################
io.on('connection', function (socket: SocketIO.Socket) {

  socket.on("new user", function (username: string) { // TODO make proper stuff when auth is introduced
    userStateRepo.createUser(username, socket, roomRepo.MainRoom);
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

  socket.on('move', (data) => {
    const game = roomRepo.getGameRoom(userStateRepo.getState(socket.id).currentRoom);
    //TODO: Change parameter names to data.from to data.start and data.dest to data.destiantion
    const result = game.move(data.from, data.dest);

    if(result) {
      socket.emit('move_result', result);
      socket.broadcast.to(game.title).emit('move_result', result);
    } else {
      socket.emit('move_result', result);
    }
  });

});

module.exports = () => {
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });
}
