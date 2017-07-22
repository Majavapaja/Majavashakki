function GameRoom(title, hostplayername) {
  this.title = title;
  this.players = [hostplayername];
  this.gamestate = {};
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