import INITIAL_STATE from '../../common/initial-state'
import {UserState} from "./UserState";

export class Game {
    public title: string;
    public players: Array<UserState> = [];
    public gameState: any;

    constructor(title:string, player: UserState) {
        this.title = title;
        this.gameState = {board: Array.from(INITIAL_STATE)}
        this.players.push(player);
    }

    public addPlayer (player: UserState) {
        if(this.players.length === 2) {
            return false;
        }
        this.players.push(player);
        return true;
    }
}