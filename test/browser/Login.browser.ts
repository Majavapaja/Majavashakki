import assert from "assert"

import * as Util from "./TestUtil"
import { Page } from 'puppeteer'

const testEmail = "foo@bar"
const user1 = {username: "matti", email: testEmail, password: "foobar"}

Util.browserSpec("Login", {numBrowsers: 1}, function() {
  it("redirects to login from front page", async function() {
    const {page} = this

    await Util.navigate(page, "/")
    await checkLocation(page, "/login")
  })

  it("can access registration page from front page", async function() {
    const {page} = this

    await Util.navigate(page, "/login")
    await Util.existsInPage(page, "#registerButton")

    await Promise.all([
      page.waitForNavigation(),
      page.click("#registerButton"),
    ])
    await checkLocation(page, "/signup")
  })

  it("registration works", async function() {
    const {page} = this

    await signup(page, testEmail, "matti", "foobar")
    await page.waitForNavigation()
    await checkLocation(page, "/")

    await Util.countInPage(page, "input[id^='game-filter']", 3)
  })

  it("login works", async function() {
    const {page} = this
    const {username, email, password} = user1

    await signup(page, email, username, password)
    await page.waitForNavigation()

    await Util.resetSession(page)

    await attemptLogin(page, email, password)

    await checkLocation(page, "/")
    await Util.countInPage(page, "input[id^='game-filter']", 3)
  })

  it("error if trying to login with invalid email", async function() {
    const {page} = this

    await attemptLogin(page, "account.does.not.exist@example.com", "password123", false)

    await checkNotification(page, `There is no account with this email. :O`)
  })

  it("error if trying to login with invalid password", async function() {
    const {page} = this

    await signup(page, user1.email, user1.username, user1.password)
    await page.waitForNavigation()
    await checkLocation(page, "/")
    await Util.resetSession(page)

    await attemptLogin(page, user1.email, "not the correct password", false)
    await checkNotification(page, `Invalid password, did you try 'salasana1'?`)
  })

  it("error if registering user with existing email", async function() {
    const {page} = this
    const email = testEmail

    await signup(page, email, "matti", "foobar")
    await page.waitForNavigation()
    await checkLocation(page, "/")

    await Util.resetSession(page)

    await signup(page, email, "matti", "foobar")
    await checkLocation(page, "/signup")

    await checkNotification(page, `Email '${email}' is already in use`)
  })
})

async function checkLocation(page, expected) {
  assert.strictEqual(await page.evaluate("window.location.pathname"), expected)
}

async function checkNotification(page, expected) {
  const element = await page.waitForSelector("#notification-snackbar", {visible: true, timeout: 1000})
  const actual = await page.evaluate(e => e.textContent, element)
  assert.strictEqual(actual, expected)
}

async function attemptLogin(page: Page, email: string, password: string, expectSuccess: boolean = true): Promise<void> {
  await Util.navigate(page, "/login")
  await page.click("#email");
  await page.keyboard.type(email)
  await page.click("#password");
  await page.keyboard.type(password)

  if (expectSuccess) {
    await Promise.all([
      page.waitForNavigation(),
      page.click("#loginButton"),
    ])
  } else {
    await page.click("#loginButton")
  }
}

async function signup(page, email, username, password) {
  await Util.navigate(page, "/signup")
  await Util.existsInPage(page, "#signupButton")
  await page.click("#email");
  await page.keyboard.type(email)
  await page.click("#username");
  await page.keyboard.type(username)
  await page.click("#password");
  await page.keyboard.type(password)
  await page.click("#passwordConfirm");
  await page.keyboard.type(password)
  await page.click("#signupButton");
}
