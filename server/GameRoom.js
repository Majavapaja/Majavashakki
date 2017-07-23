var initialBoardState = require('./logic/start-setup.json');

function GameRoom(title, hostplayername) {
  this.title = title;
  this.players = [hostplayername];
  this.gameState = Object.assign({},initialBoardState);
}
GameRoom.prototype.addPlayer = function (playername) {
    if(this.players.length === 2) {
        return false;
    }
    else {
        this.players.push(playername);
        return true;
    }
}
module.exports = GameRoom;