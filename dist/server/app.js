"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sio = require("socket.io");
const http = require("http");
const path = require("path");
const GameRoom_1 = require("./GameRoom");
const board_1 = require("./logic/board");
var app = express();
var server = http.createServer(app);
var io = sio({ transports: ['websocket'] });
io.attach(server);
var port = process.env.PORT || 3000;
app.use(express.static(path.resolve('dist/public')));
const GameRooms = [];
var TunkkuStates = {};
io.on('connection', function (socket) {
    TunkkuStates[socket.id] = {};
    var addedUser = false;
    socket.join("lobby");
    socket.on("create gameroom", function (roomTitle) {
        if (!io.sockets.adapter.rooms[roomTitle]) {
            var room = new GameRoom_1.GameRoom(roomTitle, TunkkuStates[socket.id].username);
            GameRooms.push(room);
            TunkkuStates[socket.id].room = room;
            socket.join(room.title);
            socket.emit("game joined", room);
            socket.broadcast.to("lobby").emit("gameroom created", room);
        }
        else {
        }
    });
    socket.on("join gameroom", function (roomTitle) {
        if (io.sockets.adapter.rooms[roomTitle].length < 2) {
            var room = GameRooms.find(function (gameroom) {
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
        }
    });
    socket.on("new user", function (username) {
        TunkkuStates[socket.id].username = username;
        socket.emit('login', {
            username: username,
            rooms: GameRooms
        });
    });
    let board = new board_1.Board(socket, TunkkuStates);
});
module.exports = () => {
    server.listen(port, function () {
        console.log('Server listening at port %d', port);
    });
};
