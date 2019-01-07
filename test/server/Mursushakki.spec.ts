import assert from "assert";
import request from "request-promise"
import mongoose from "mongoose";

import { start } from "../../src/server/app"

const PORT = 3001

describe("Mursushakki API", () => {
  let closeServer
  let http: HttpClient

  beforeEach(async () => {
    closeServer = await start(PORT)
    http = mkHttpClient()
  })

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase()
    await closeServer()
  })

  it("should allow registerng and logging in", async () => {
    const userBeforeLogin = await http("GET", "/api/user")
    assert.strictEqual(userBeforeLogin, undefined)

    await registerAndLogin(http, "Mikko Mallikas", "mikko.mallikas@example.com", "password123")

    const user = await http("GET", "/api/user")
    assert.strictEqual(typeof user.id, "string")
    assert.strictEqual(user.name, "Mikko Mallikas")
    assert.strictEqual(user.email, "mikko.mallikas@example.com")
  })

  it("should return 401 on invalid login", async () => {
    try {
      await http("POST", "/api/login", { email: "doesnotexist@example.com", password: "password123" })
      assert.fail("Login should have thrown because of invalid credentials")
    } catch (e) {
      assert.strictEqual(e.name, "StatusCodeError")
      assert.strictEqual(e.statusCode, 401)
    }
  })

  it("should show only games available for joining", async () => {
    const player1 = mkHttpClient()
    const player2 = mkHttpClient()

    // All players see 0 games
    await registerAndLogin(http, "Spede Spectator", "spede@example.com", "pissakakka123")
    await registerAndLogin(player1, "Matti", "matti@example.com", "password123")
    await registerAndLogin(player2, "Teppo", "teppo@example.com", "s4l4s4n4")
    assert.strictEqual((await http("GET", "/api/games")).length, 0)
    assert.strictEqual((await player1("GET", "/api/games")).length, 0)
    assert.strictEqual((await player2("GET", "/api/games")).length, 0)

    // Player 1 creates and joins a game
    const game = await player1("POST", "/api/games", { title: "A Game of Matti and Shakki" })
    assert.strictEqual(game.title, "A Game of Matti and Shakki")
    await player1("POST", `/api/games/${game.id}/join`)

    // Other players see the game
    assert.strictEqual((await http("GET", "/api/games")).length, 1)
    const games = await player2("GET", "/api/games")
    assert.strictEqual(games.length, 1)

    // Player 2 joins the game
    assert.strictEqual(games[0].id, game.id)
    const fullGame = await player2("POST", `/api/games/${games[0].id}/join`)

    // Spectator no longer sees the game
    assert.strictEqual((await http("GET", "/api/games")).length, 0)
  })

  it("should allow making moves in game", async () => {
    const player1 = mkHttpClient()
    const player2 = mkHttpClient()

    // Join players to the game
    await registerAndLogin(player1, "Matti", "matti@example.com", "password123")
    await registerAndLogin(player2, "Teppo", "teppo@example.com", "s4l4s4n4")
    const game = await player1("POST", "/api/games", { title: "A Game of Matti and Shakki" })
    await player1("POST", `/api/games/${game.id}/join`)
    await player2("POST", `/api/games/${game.id}/join`)

    // Make way for the queen!
    assert.strictEqual((await player1("POST", `/api/games/${game.id}/move`, {from: {col: "g", row: "2"}, dest: {col: "g", row: "4"}})).status, "success")
    assert.strictEqual((await player2("POST", `/api/games/${game.id}/move`, {from: {col: "e", row: "7"}, dest: {col: "e", row: "6"}})).status, "success")
    assert.strictEqual((await player1("POST", `/api/games/${game.id}/move`, {from: {col: "f", row: "2"}, dest: {col: "f", row: "3"}})).status, "success")
    assert.strictEqual((await player2("POST", `/api/games/${game.id}/move`, {from: {col: "d", row: "8"}, dest: {col: "h", row: "4"}})).status, "success")

    // TODO: Properly indicate that checkmate has happened
    const err = await player2("POST", `/api/games/${game.id}/move`, {from: {col: "e", row: "1"}, dest: {col: "f", row: "2"}})
    assert.strictEqual(err.status, "error")
  })
})

async function registerAndLogin(http: HttpClient, name: string, email: string, password: string): Promise<any> {
  const registerResult = await http("POST", "/api/user/register", { name, email, password })
  assert.strictEqual(registerResult.status, "OK")

  try {
    await http("POST", "/api/login", { email, password })
    assert.fail("Login should have thrown because of redirect")
  } catch (e) {
    assert.strictEqual(e.name, "StatusCodeError")
    assert.strictEqual(e.statusCode, 302)
  }
}

type HttpClient = (method: "GET" | "POST", path: string, body?: any) => Promise<any>

function mkHttpClient(): HttpClient {
  const jar = request.jar()

  return async (method, path, body) => {
    return await request({
      method,
      url: `http://localhost:${PORT}${path}`,
      body,
      json: true,
      jar,
    })
  }
}
