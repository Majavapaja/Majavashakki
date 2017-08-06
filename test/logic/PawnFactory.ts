import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

factory.define("board", Board, {
    pieces: makeInitialState(),
});

export default factory;
