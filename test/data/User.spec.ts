import {UserSchema, IUserModel} from "../../src/server/Data/User";
import * as mongoose from "mongoose";
import {Mockgoose} from "../../node_modules/mockgoose/built/mockgoose";
import * as assert from "assert";

const mockgoose = new Mockgoose(mongoose);
var User: IUserModel;

describe("User", () => {

    beforeEach(async () => {
        await mockgoose.prepareStorage();
        await mongoose.connect("mongodb://localhost/test");
        User = mongoose.model('User', UserSchema) as IUserModel;
    });

    describe("findOrCreate", () => {
        it("should create user", async () => {

            await User.findOrCreate("M4T4L4");

            var users = await User.find().exec();
            assert.equal(1, users.length, "users");

        });
    });

    describe("addGame", () => {
        it("should add game for logged in user", async () => {

            var Usr = User;
            var user = await Usr.findOrCreate("M4T4L4");

            Usr.updateName(user._id, "HerraMatala");
            await Usr.addGame(user._id, "P3L1");
            user = await Usr.findOrCreate("M4T4L4");

            assert.equal(user.games.length, 1, "added game");
            assert.equal(user.games[0], "P3L1", "game title");

            // https://github.com/Mockgoose/Mockgoose/issues/71

        });
    });
});