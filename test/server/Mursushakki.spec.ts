import assert from "assert";
import {AssertionError} from "assert"
import request from "request-promise"
import mongoose from "mongoose";

import { start } from "../../src/server/app"
import {clearDatabase} from "../../src/server/mongo"

const PORT = "3001"

describe("Mursushakki API", () => {
  let closeServer
  let http: HttpClient

  before(async () => {
    closeServer = await start(PORT)
  })
  beforeEach(async () => {
    await clearDatabase()
    http = mkHttpClient()
  })

  after(async () => {
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

  it("should return nvalidation error if registering with duplicate email", async () => {
    const email = "mikko.mallikas@example.com"

    const success = await http("POST", "/api/user/register", { name: "Eka Mallikas", email, password: "password123" })
    assert.strictEqual(success.status, "OK")

    try {
      const failure = await http("POST", "/api/user/register", { name: "Toka Mallikas", email, password: "foobar!" })
      assert.fail("Duplicate registration should have thrown ValidationError")
    } catch (e) {
      if (e instanceof AssertionError) throw e
      assertValidation(e, [`Email '${email}' is already in use`])
    }
  })

  it("should return 401 on invalid login", async () => {
    try {
      await http("POST", "/api/login", { email: "doesnotexist@example.com", password: "password123" })
      assert.fail("Login should have thrown because of invalid credentials")
    } catch (e) {
      if (e instanceof AssertionError) throw e
      assert.strictEqual(e.name, "StatusCodeError")
      assert.strictEqual(e.statusCode, 401)
    }
  })

  it("should return 400 and error message when supplying invalid email on profile page", async () => {
    await registerAndLogin(http, "Mikko Mallikas", "mikko.mallikas@example.com", "password123")
    try {
      await http("POST", "/api/user", { name:  "Mikko Mallikas", email: "kelvoton maili" })
      assert.fail("Updating user with invalid email should fail")
    } catch (e) {
      if (e instanceof AssertionError) throw e
      assertValidation(e, ["Email 'kelvoton maili' is invalid (should contain at least @ character)"])
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
    let game, move

    // Join players to the game
    await registerAndLogin(player1, "Matti", "matti@example.com", "password123")
    await registerAndLogin(player2, "Teppo", "teppo@example.com", "s4l4s4n4")
    game = await player1("POST", "/api/games", { title: "A Game of Matti and Shakki" })
    await player1("POST", `/api/games/${game.id}/join`)
    await player2("POST", `/api/games/${game.id}/join`)

    // Make way for the queen!
    assert.strictEqual((await player1("POST", `/api/games/${game.id}/move`, {from: {col: "g", row: "2"}, dest: {col: "g", row: "4"}})).status, "success")
    assert.strictEqual((await player2("POST", `/api/games/${game.id}/move`, {from: {col: "e", row: "7"}, dest: {col: "e", row: "6"}})).status, "success")

    move = await player1("POST", `/api/games/${game.id}/move`, {from: {col: "f", row: "2"}, dest: {col: "f", row: "3"}})
    assert.strictEqual(move.status, "success")
    assert.strictEqual(move.isCheck, false)
    assert.strictEqual(move.isCheckmate, false)

    game = await player1("GET", `/api/games/get/${game.id}`)
    assert.strictEqual(game.isCheck, false)
    assert.strictEqual(game.isCheckmate, false)

    move = await player2("POST", `/api/games/${game.id}/move`, {from: {col: "d", row: "8"}, dest: {col: "h", row: "4"}})
    assert.strictEqual(move.status, "success")
    assert.strictEqual(move.isCheck, true)
    assert.strictEqual(move.isCheckmate, true)

    // Game should be marked check and checkmate
    game = await player1("GET", `/api/games/get/${game.id}`)
    assert.strictEqual(game.isCheck, true)
    assert.strictEqual(game.isCheckmate, true)

    assert.strictEqual((await player2("POST", `/api/games/${game.id}/move`, {from: {col: "e", row: "1"}, dest: {col: "f", row: "2"}})).status, "error")

  })
})

function assertValidation(e: any, errors: string[]) {
  assert.strictEqual(e.name, "StatusCodeError")
  assert.strictEqual(e.statusCode, 400)
  assert.deepStrictEqual(e.response.body.errors, errors)
}

async function registerAndLogin(http: HttpClient, name: string, email: string, password: string): Promise<any> {
  const registerResult = await http("POST", "/api/user/register", { name, email, password })
  assert.strictEqual(registerResult.status, "OK")

  try {
    await http("POST", "/api/login", { email, password })
    assert.fail("Login should have thrown because of redirect")
  } catch (e) {
    if (e instanceof AssertionError) throw e
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
