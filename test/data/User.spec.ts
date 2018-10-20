import {UserSchema, IUserModel} from "../../src/server/data/User";
import {IGameDocument} from "../../src/server/data/GameModel";
import * as mongoose from "mongoose";
import * as assert from "assert";
import * as TypeMoq from "typemoq";
import * as Majavashakki from "../../src/common/GamePieces";

const connectionString = "mongodb://localhost/test"
const User = mongoose.model("User", UserSchema) as IUserModel;

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

            const mockGameDoc = TypeMoq.Mock.ofType<IGameDocument>();
            mockGameDoc.setup(d => d.denormalize()).returns(() => ({title: "P3L1"} as Majavashakki.IGameRef));

            await User.addGame(user._id, mockGameDoc.object);
            user = await User.findOrCreate("M4T4L4");

            assert.equal(user.games.length, 1, "added game");
            assert.equal(user.games[0].title, "P3L1", "game title");
        });
    });
});
