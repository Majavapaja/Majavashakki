import {IUserModel} from "../../src/server/Data/User";
import * as mongoose from "mongoose";
import {Mockgoose} from "../../node_modules/mockgoose/built/mockgoose";
import * as assert from "assert";

var mockgoose: Mockgoose;

describe("User", () => {

    beforeEach(() => {
        const mong = new mongoose.Mongoose();
        mockgoose = new Mockgoose(mong);
    });

    describe("findOrCreate", () => {
        it("should create user", done => {

            done();

        });
    });

    describe("addGame", () => {
        it("should add game for logged in user", async () => {
            console.log("prepare");
            await mockgoose.prepareStorage();
            console.log("after prepare");
            var Usr = mongoose.model('User') as IUserModel;
            console.log("usr");
            const user = await Usr.findOrCreate("M4T4L4");
            user.name = "HerraMatala";
            console.log("findOrCreate");
            await Usr.addGame(user._id, "P3L1");
            console.log("assert");

            assert.equal(user.games.length, 1, "added game");
            assert.equal(user.games[0], "PPPPP", "game title");

        });
    });
});