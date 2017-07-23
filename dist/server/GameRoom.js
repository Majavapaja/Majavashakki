"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialBoardState = require('./board-template.json');
class GameRoom {
    constructor(title, hostplayername) {
        this.players = [];
        this.gameState = Object.assign({}, initialBoardState);
        this.title = title;
        this.players.push(hostplayername);
    }
    addPlayer(playername) {
        if (this.players.length === 2) {
            return false;
        }
        this.players.push(playername);
        return true;
    }
}
exports.GameRoom = GameRoom;
