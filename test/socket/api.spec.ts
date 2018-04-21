import * as io from "socket.io-client";
import {expect} from "chai";

import {start} from "../../src/server/app";

const TEST_PORT = 3001;

describe("Socket API", () => {
    let app, socket;

    beforeEach(() => {
        app = start(TEST_PORT);
        socket = io(`http://localhost:${TEST_PORT}`);
    });

    after(() => {
        app.close();
        socket.close();
    })

    it("should choose an username", done => {
        const USERNAME = "Matti Meikäläinen";

        socket.emit("new user", USERNAME);
        socket.on("login", response => {
            expect(response).to.equal(USERNAME)
            done()
        })
    });

    it("should create and join a room", done => {
        const USERNAME = "Matti Meikäläinen";
        const ROOMNAME = "Olohuone";

        socket.emit("new user", USERNAME);
        socket.on("login", response => socket.emit("fetch-games"));
        socket.on("update-games", response => {
            expect(response).to.be.an("array").that.is.empty;
            socket.emit("create-game", ROOMNAME);
        })
        socket.on("game-joined", response => {
            expect(response).to.be.undefined;
            done()
        })
    });
});
