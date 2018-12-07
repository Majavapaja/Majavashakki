import {UserSchema, IUserModel} from "../../src/server/data/User";
import {GameSchema, IGameModel} from "../../src/server/data/GameModel";
import mongoose from "mongoose";
import assert from "assert";

const connectionString = "mongodb://localhost:27017/test"
const User = mongoose.model("User", UserSchema) as IUserModel;
const GameModel = mongoose.model("GameModel", GameSchema) as IGameModel;

describe("User", () => {
    beforeEach(async () => {
        await mongoose.connect(connectionString, {useNewUrlParser: true});
        await mongoose.connection.db.dropDatabase()
    });

    afterEach(async () => {
        await mongoose.disconnect()
    })

    describe("findOrCreate", () => {
        it("should create user", async () => {
            await User.findOrCreate("M4T4L4");

            const users = await User.find().exec();
            assert.equal(1, users.length, "users");
        });
    });

    describe("addGame", () => {
        it("should add game for logged in user", async () => {
            const facebookId = "M4T4L4"

            let user = await User.findOrCreate(facebookId);

            const doc = await GameModel.findOrCreate("P3L1")
            await User.addGame(user._id, doc.title);

            user = await User.findOne({facebookId}).exec();
            assert.equal(user.games.length, 1, "added game");
            assert.equal(user.games[0], "P3L1", "game title");
        });
    });
});
