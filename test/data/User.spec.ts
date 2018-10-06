import {UserSchema, IUserModel} from "../../src/server/Data/User";
import * as mongoose from "mongoose";
import {Mockgoose} from "../../node_modules/mockgoose/built/mockgoose";
import * as assert from "assert";

var mockgoose: Mockgoose;

describe("User", () => {

    beforeEach(async () => {
        mockgoose = new Mockgoose(mongoose);
        await mockgoose.prepareStorage();
        await mongoose.connect("mongodb://localhost/test");
    });

    describe("findOrCreate", () => {
        it("should create user", done => {

            done();

        });
    });

    describe("addGame", () => {
        it("should add game for logged in user", async () => {

            var Usr = mongoose.model('User', UserSchema) as IUserModel;

            var user = await Usr.findOrCreate("M4T4L4");

            Usr.updateName(user._id, "HerraMatala");
            await Usr.addGame(user._id, "P3L1");
            user = await Usr.findOrCreate("M4T4L4");

            assert.equal(user.games.length, 1, "added game");
            assert.equal(user.games[0], "P3L1", "game title");

        });
    });
});