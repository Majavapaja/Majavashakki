import {User, IUserModel} from "../../src/server/Data/User";
import * as mongoose from "mongoose";
import {Mockgoose} from "mockgoose";
import * as assert from "assert";

describe("User", () => {
    describe("addGame", () => {
        it("should add game for logged in user", done => {

            var mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage().then(async () => {
                var Usr = mongoose.model('User') as IUserModel;
                const user = await Usr.findOrCreate("P3L1");
                await Usr.addGame(user._id, "peli");

                assert.equal(user.games.length, 1, "added game");
                assert.equal(user.games[0], "P3L1", "game title");
                done();
            });
            done();

        });
    });
});