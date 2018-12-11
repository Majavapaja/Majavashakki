import * as assert from "assert";
import request from "request-promise"
import mongoose from "mongoose";

import { start } from "../../src/server/app"

const PORT = 3000

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
})

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
