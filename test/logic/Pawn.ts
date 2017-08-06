import * as assert from "assert";
import factory from "./PawnFactory";

describe("Pawn movement", () => {
    describe("Moving in default board", () => {
        it("should allow pawn to move a2 a3", done => {
            factory.build("board").then(board => {
                const result = board.move({col: "a", row: "2"}, {col: "a", row: "3"});
                if (result.kind === "success") {
                    done();
                    return;
                }

                done(result);
            });
        });

        it("should not allow pawn to move a2 a5", done => {
            factory.build("board").then(board => {
                const result = board.move({col: "a", row: "2"}, {col: "a", row: "5"});
                if (result.kind === "error") {
                    done();
                    return;
                }

                done(result);
            });
        });
    });
});
