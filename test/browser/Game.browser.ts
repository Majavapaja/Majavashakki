import assert from "assert"
import * as Util from "./TestUtil"

Util.browserSpec("Game", { numBrowsers: 2 }, function() {
  it("plays the shortest game ever", async function() {
    const [white, black] = this.pages
    await setupGame(white, black)

    await makeMoves(white, black, "white", [
      ["g2", "g4"],
      ["e7", "e6"],
      ["f2", "f3"],
    ])

    await makeMove(black, "d8", "h4")
    await checkText(white, "#blackBadge.isWinner", "John Doe")
    await checkText(black, "#blackBadge.isWinner", "John Doe")
  })

  // "This sample chess game was played between Paul Morphy and his two
  // opponents, the Duke of Brunswick and Count Isouard, in 1858 during a
  // performance of The Barber of Seville at the Paris Opera."
  //
  // https://www.family-games-treasurehouse.com/sample_chess_game.html
  it("plays a complete chess game", async function() {
    const [white, black] = this.pages
    await setupGame(white, black)

    await makeMoves(white, black, "white", [
      ["e2", "e4"],
      ["e7", "e5"], // e4 e5
      ["g1", "f3"],
      ["d7", "d6"], // Nf3 d6
      ["d2", "d4"],
      ["c8", "g4"], // d4 Bg4
      ["d4", "e5"],
      ["g4", "f3"], // d4xe5 Bxf3
      ["d1", "f3"],
      ["d6", "e5"], // Qxf3 d6xe5
      ["f1", "c4"],
      ["g8", "f6"], // Bc4 Nf6
      ["f3", "b3"],
      ["d8", "e7"], // Qb3 Qe7
      ["b1", "c3"],
      ["c7", "c6"], // Nc3 c6
      ["c1", "g5"],
      ["b7", "b5"], // Bg5 b5
      ["c3", "b5"],
      ["c6", "b5"], // Nxb5 c6xb5
      ["c4", "b5"],
      ["b8", "d7"], // Bxb5+ Nd7
    ])
    // 0-0-0, custom checks for castling
    await makeMoveWithAssertions(white, "e1", "c1", [
      ["c1", "king"],
      ["d1", "rook"],
    ])
    await makeMoves(white, black, "black", [
      ["a8", "d8"], // Rd8
      ["d1", "d7"],
      ["d8", "d7"], // Rxd7 Rxd7
      ["h1", "d1"],
      ["e7", "e6"], // Rd1 Qe6
      ["b5", "d7"],
      ["f6", "d7"], // Bxd7+ Nxd7
      ["b3", "b8"],
      ["d7", "b8"], // Qb8+ Nxb8
    ])
    await makeMove(white, "d1", "d8")

    await checkText(white, "#whiteBadge.isWinner", "John Smith")
    await checkText(black, "#whiteBadge.isWinner", "John Smith")
  })

  it("implments pawn promotion correctly", async function() {
    const [white, black] = this.pages
    await setupGame(white, black)

    await makeMoves(white, black, "white", [
      ["g2", "g4"],
      ["b8", "a6"],
      ["g4", "g5"],
      ["a6", "b8"],
      ["g5", "g6"],
      ["b8", "a6"],
      ["g6", "h7"],
      ["a6", "b8"],
    ])

    await makeMoveWithAssertions(white, "h7", "g8", [])
    await promotePawn(white)

    await assertPieceType(white, "g8", "queen")
    await assertPieceType(black, "g8", "queen")
  })
})

async function makeMoves(white, black, currentTurn: "white" | "black", moves: Array<[string, string]>): Promise<void> {
  for (const move of moves) {
    await makeMove(currentTurn === "white" ? white : black, ...move)
    currentTurn = currentTurn === "white" ? "black" : "white"

    await waitForTurn(white, currentTurn)
    await waitForTurn(black, currentTurn)
  }
}

async function assertPieceType(page, position, pieceType: string) {
  await page.waitForSelector(`div[data-position=${position}] span[data-piece-type=${pieceType}]`)
}

async function promotePawn(page) {
  await page.waitForSelector(`[data-promote-type=queen]`)
  await page.click(`[data-promote-type=queen]`)
}

async function checkText(page, selector, expected) {
  const element = await page.waitForSelector(selector, { visible: true, timeout: 1000 })
  const actual = await page.evaluate(e => e.textContent, element)
  assert.strictEqual(actual, expected)
}

async function login(page, email, password) {
  await Util.navigate(page, "/login")
  await Util.existsInPage(page, "#loginButton")
  await page.type("#email", email)
  await page.type("#password", password)
  await Promise.all([page.waitForNavigation(), page.click("#loginButton")])
}

async function createGame(page, gameName) {
  await Util.navigate(page, "/")
  await Util.click(page, "#createGame")
  await page.type("input[name=name]", gameName)
  await Util.click(page, "#createGameDialog #createButton")
}

async function joinGame(page, gameName) {
  await Util.navigate(page, "/")
  const xpath = `//span[contains(., '${gameName}')]`
  const game = await page.waitForXPath(xpath)
  await game.click()
  await page.waitForSelector("[data-test-ui-component=board]")
}

async function makeMove(page, start, destination: string) {
  console.log(`Making move ${start} -> ${destination}`)
  // If no checks are given, default to checking that the piece is moved
  const startElem = await page.waitForSelector(`div[data-position=${start}] span[data-piece-type]`)
  const pieceType = await page.evaluate(e => e.getAttribute("data-piece-type"), startElem)

  await makeMoveWithAssertions(page, start, destination, [[destination, pieceType]])
}

async function makeMoveWithAssertions(page, start, destination: string, assertions: Array<[string, string]>) {
  await page.click(`div[data-position=${start}]`)
  await page.click(`div[data-position=${destination}]`)

  for (const [position, pieceType] of assertions) {
    await page.waitForSelector(`div[data-position=${position}] span[data-piece-type=${pieceType}]`)
  }
}

async function setupGame(white, black) {
  await Promise.all([
    login(white, "john.smith@example.com", "johnsmith123"),
    login(black, "john.doe@example.com", "johndoe123"),
  ])
  await createGame(white, "foobar")
  await joinGame(black, "foobar")
}

async function waitForTurn(page, color) {
  await page.waitForSelector(`#${color}Badge.isActive`)
}
