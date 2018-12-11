import * as assert from "assert";
import request from "request-promise"
import mongoose from "mongoose";

import { start } from "../../src/server/app"

const PORT = 3000

describe("Mursushakki API", () => {
  let closeServer
  let cookieJar

  beforeEach(async () => {
    closeServer = await start(PORT)
    cookieJar = request.jar()
  })

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase()
    await closeServer()
  })

  it("should allow registerng and logging in", async () => {
    const userBeforeLogin = await req("GET", "/api/user")
    assert.strictEqual(userBeforeLogin, undefined)

    await registerAndLogin("Mikko Mallikas", "mikko.mallikas@example.com", "password123")

    const user = await req("GET", "/api/user")
    assert.strictEqual(typeof user.id, "string")
    assert.strictEqual(user.name, "Mikko Mallikas")
    assert.strictEqual(user.email, "mikko.mallikas@example.com")
  })

  async function registerAndLogin(name: string, email: string, password: string): Promise<any> {
    const registerResult = await req("POST", "/api/user/register", { name, email, password })
    assert.strictEqual(registerResult.status, "OK")

    try {
      await req("POST", "/api/login", { email, password })
      assert.fail("Login should have thrown because of redirect")
    } catch (e) {
      assert.strictEqual(e.name, "StatusCodeError")
      assert.strictEqual(e.statusCode, 302)
    }
  }

  async function req(method: "GET" | "POST", path: string, body?: any): Promise<any> {
    return await request({
      method,
      url: `http://localhost:${PORT}${path}`,
      body,
      json: true,
      jar: cookieJar,
    })
  }
})
