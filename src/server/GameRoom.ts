var initialBoardState = require('./board-template.json');

export class GameRoom {
    public title: string;
    public players: Array<string> = [];
    public gameState: any = Object.assign({},initialBoardState);

    constructor(title:string , hostplayername: string) {
        this.title = title;
        this.players.push(hostplayername);
    }

    public addPlayer (playername: string) {
        if(this.players.length === 2) {
            return false;
        }
        this.players.push(playername);
        return true;
    }
}