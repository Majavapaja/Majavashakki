// Import external modules
import * as express from "express";
import * as sio from "socket.io";
// Import node core modules
import * as http from "http";
import * as path from "path";
// Import custom components
import {GameRoom} from "./GameRoom";
import {Board} from "./logic/board";

var app = express();
var server = http.createServer(app);
var io = sio({transports:['websocket']});
io.attach(server);
var port = process.env.PORT || 3000;

// ################ Routing ################
app.use(express.static(path.resolve('dist/public')));

// Gameroom
const GameRooms: Array<GameRoom> = [];
// Magnificent STATE object
var TunkkuStates = {};

io.on('connection', function (socket) {
  TunkkuStates[socket.id] = {};
  var addedUser = false;
  socket.join("lobby");

  // when the client emits 'create gameroom', this listens and executes
  socket.on("create gameroom", function (roomTitle: string) {
    // Create new gameroom to global list.
    // Add user to proper socket room
    if(!io.sockets.adapter.rooms[roomTitle]) {
      var room = new GameRoom(roomTitle, TunkkuStates[socket.id].username);
      GameRooms.push(room);
      TunkkuStates[socket.id].room = room;
      socket.join(room.title);
      socket.emit("game joined", room);
      socket.broadcast.to("lobby").emit("gameroom created", room);
    }
    else {
      // TODO näytä keskaria - huone on jo olemassa.
    }
  });

  socket.on("join gameroom", function (roomTitle){
    // Add user to socket room
    if(io.sockets.adapter.rooms[roomTitle].length < 2) {
      var room = GameRooms.find(function(gameroom) {
        return gameroom.title === roomTitle;
      });
      room.addPlayer(TunkkuStates[socket.id].username);
      TunkkuStates[socket.id].room = room;
      socket.join(room.title);
      socket.broadcast.to("lobby").emit("gameroom full", room);
      socket.emit("game joined", room);
      socket.broadcast.to(room.title).emit("game started", room);
    }
    else {
      // TODO gtfo
    }
  });

  // when the client emits 'add user', this listens and executes
  socket.on("new user", function (username: string) {
    // we store the username in the socket session for this client
    TunkkuStates[socket.id].username = username;

    // Ditch login page and render hello msg + list of available game rooms
    socket.emit('login', {
      username: username,
      rooms: GameRooms
    });
  });

  let board = new Board(socket, TunkkuStates);
});

module.exports = () => {
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });
}
