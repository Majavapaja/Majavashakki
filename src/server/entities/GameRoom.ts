import Board from "../entities/Board";
import {MoveResponse, MoveSuccess, MoveError} from "../../common/protocol";
import {UserState} from "./UserState";

export class Game {
    public title: string;
    public players: UserState[] = [];
    public gameState: any;

    constructor(title: string, player: UserState) {
        this.title = title;
        this.gameState = {board: new Board()};
        this.players.push(player);
    }

    public addPlayer(player: UserState) {
        if (this.players.length === 2) {
            return false;
        }
        this.players.push(player);
        return true;
    }

    public move(start: Position, destination: Position): MoveResponse {
        const result = this.gameState.board.move(start, destination);

        if (result) {
            return {kind: "success", moveType: "move", board: this.gameState.board.pieces};
        } else {
            return {kind: "error", error: "Error 10: Invalid movement."};
        }
    }
}
