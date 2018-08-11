import Board from "../entities/Board";
import {MoveResponse, MoveSuccess, MoveError} from "../../common/protocol";
import {UserState} from "./UserState";
import {Position} from "../../common/types";

export class Game {
    public title: string;
    public playerIdWhite: string;
    public playerIdBlack: string;
    public gameState: {board: Board };

    constructor(title: string, player?: UserState) {
        this.title = title;
        this.gameState = {board: new Board()};
    }

    public isFull(): boolean {
        return !!this.playerIdWhite && !!this.playerIdBlack;
    }

    public addPlayer(playerId: string) {
        if(!this.playerIdWhite) {
            this.playerIdWhite = playerId;
        } else if (!this.playerIdBlack) {
            this.playerIdBlack = playerId;
        }
        else {
            throw new Error("Paskaa täynnä, ei mahu - shit has hit fan even though it should not be possible, call Avengers")
        }
        return true;
    }

    public move(start: Position, destination: Position): MoveResponse {
        return this.gameState.board.move(start, destination);
    }
}
