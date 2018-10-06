import {UserSchema, IUserModel} from "../../src/server/data/User";
import * as mongoose from "mongoose";
import * as assert from "assert";

const connectionString = process.env.MajavashakkiMongoConnectionString ?
    process.env.MajavashakkiMongoConnectionString :
    "mongodb://localhost/test"

const User = mongoose.model('User', UserSchema) as IUserModel;

describe("User", () => {
    beforeEach(async () => {
        await mongoose.connect(connectionString);
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
            let user = await User.findOrCreate("M4T4L4");

            User.updateName(user._id, "HerraMatala");
            await User.addGame(user._id, "P3L1");
            user = await User.findOrCreate("M4T4L4");

            assert.equal(user.games.length, 1, "added game");
            assert.equal(user.games[0], "P3L1", "game title");
        });
    });
});
