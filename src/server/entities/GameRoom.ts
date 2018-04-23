import Board from "../entities/Board";
import {MoveResponse, MoveSuccess, MoveError} from "../../common/protocol";
import {UserState} from "./UserState";
import {Position} from "../../common/types";

export class Game {
    public title: string;
    public players: UserState[] = [];
    public gameState: {board: Board };

    constructor(title: string, player?: UserState) {
        this.title = title;
        this.gameState = {board: new Board()};
        if (player) {
            this.players.push(player);
        }
    }

    public addPlayer(player: UserState) {
        if (this.players.length === 2) {
            return false;
        }
        this.players.push(player);
        return true;
    }

    public move(start: Position, destination: Position): MoveResponse {
        return this.gameState.board.move(start, destination);
    }
}
