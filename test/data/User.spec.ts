import {User, IUserDocument, UserSchema, IUserModel} from "../../src/server/Data/User";
//import {model, Mongoose} from "mongoose";
import * as mongoose from "mongoose";
import {Mockgoose} from "../../node_modules/mockgoose/built/mockgoose";
import * as assert from "assert";

var mockgoose: Mockgoose;

describe("User", () => {

    beforeEach(() => {
        //const mong = new mongoose.Mongoose();
        mockgoose = new Mockgoose(mongoose);
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
            var m = await mongoose.connect("mongodb://localhost/test");
            var Usr = mongoose.model('User', UserSchema) as IUserModel;

            console.log("usr");
            var user = await Usr.findOrCreate("M4T4L4");

            console.log("u");
            Usr.updateName(user._id, "HerraMatala");
            console.log("findOrCreate");
            await Usr.addGame(user._id, "P3L1");
            user = await Usr.findOrCreate("M4T4L4");
            console.log("assert");

            assert.equal(user.games.length, 1, "added game");
            assert.equal(user.games[0], "P3L1", "game title");

        });
    });
});