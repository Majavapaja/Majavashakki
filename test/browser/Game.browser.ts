import assert from "assert"

import * as Util from "./TestUtil"

const testEmail = "foo@bar"
const user1 = {username: "matti", email: testEmail, password: "foobar"}

Util.browserSpec("Game", {numBrowsers: 2}, function() {
  it("plays the shortest game ever", async function() {
    const [page1, page2] = this.pages

    await login(page1, "john.smith@example.com", "johnsmith123")
    await createGame(page1, "foobar")

    await login(page2, "john.doe@example.com", "johndoe123")
    await joinGame(page2, "foobar")

    await makeMoves(page1, page2, "white", [
      ["g2", "g4"],
      ["e7", "e6"],
      ["f2", "f3"],
    ])

    await makeMove(page2, "d8", "h4")
    await checkText(page1, "#winMessage", "The winner is black")
    await checkText(page2, "#winMessage", "The winner is black")
  })

  it("implments pawn promotion correctly", async function() {
    const [page1, page2] = this.pages

    await login(page1, "john.smith@example.com", "johnsmith123")
    await createGame(page1, "foobar")

    await login(page2, "john.doe@example.com", "johndoe123")
    await joinGame(page2, "foobar")

    await makeMoves(page1, page2, "white", [
      ["g2", "g4"],
      ["b8", "a6"],
      ["g4", "g5"],
      ["a6", "b8"],
      ["g5", "g6"],
      ["b8", "a6"],
      ["g6", "h7"],
      ["a6", "b8"],
    ])

    await makeMove(page1, "h7", "g8")
    await promotePawn(page1)

    await assertPieceType(page1, "g8", "queen")
    await assertPieceType(page2, "g8", "queen")
  })
})

async function makeMoves(
  white, black,
  currentTurn: "white" | "black",
  moves: Array<[string, string]>,
): Promise<void> {
  for (const move of moves) {
    await makeMove(currentTurn === "white" ? white : black, ...move)
    currentTurn = currentTurn === "white" ? "black" : "white"
    await waitForTurn(white, currentTurn)
    await waitForTurn(black, currentTurn)
  }
}

async function assertPieceType(page, position, pieceType) {
  await page.waitForSelector(`div[data-position=${position}] div[data-piece-type=${pieceType}]`)
}

async function promotePawn(page) {
  await page.waitForSelector(`[data-promote-type=queen]`)
  await page.click(`[data-promote-type=queen]`)
}

async function checkText(page, selector, expected) {
  const element = await page.waitForSelector(selector, {visible: true, timeout: 1000})
  const actual = await page.evaluate(e => e.textContent, element)
  assert.strictEqual(actual, expected)
}

async function login(page, email, password) {
  await Util.navigate(page, "/login")
  await Util.existsInPage(page, "#loginButton")
  await page.type("#email", email)
  await page.type("#password", password)
  await Promise.all([
    page.waitForNavigation(),
    page.click("#loginButton"),
  ])
}

async function createGame(page, gameName) {
  await Util.navigate(page, "/")
  await page.click("#createGame")
  await page.type("input[name=name]", gameName)
  await page.click("#createGameDialog #createButton")
}

async function joinGame(page, gameName) {
  await Util.navigate(page, "/")
  const xpath = `//span[contains(., '${gameName}')]`
  const game = await page.waitForXPath(xpath)
  await game.click()
  await page.waitForSelector("[data-test-ui-component=board]")
}

async function makeMove(page, start, destination) {
  await page.waitForSelector(`div[data-position=${start}]`)
  await page.click(`div[data-position=${start}]`)
  await page.click(`div[data-position=${destination}]`)
  await page.waitForSelector(`div[data-position=${destination}] div[data-piece-type]`)
}

async function waitForTurn(page, color) {
  await page.waitForSelector(`#${color}Badge.active`)
}
