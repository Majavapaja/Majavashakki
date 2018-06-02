import {User} from "../../src/server/Data/User";
import * as mongoose from "mongoose";
import {Mockgoose} from "mockgoose";

describe("User", () => {
    describe("addGame", () => {
        it("should add game for logged in user", done => {

            var mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage().then(async () => {
                User.findOrCreate("P3L1", (err, user) => {
                    User.addGame(user._id, "peli");
                    done();
                });
            });
            done();

        });
    });
});