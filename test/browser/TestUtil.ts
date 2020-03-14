import assert from "assert"
import puppeteer from "puppeteer"
import { start } from "../../src/server/app"
import { clearDatabase, initTestData } from "./MongoUtil"

const PORT = process.env.TEST_PORT || "3001"
const runHeadless = !!process.env.CI

export function browserSpec(name, { numBrowsers }, func) {
  describe(name, function() {
    this.timeout(60_000)

    before(async function() {
      this.closeServer = await start(PORT)
      this.browsers = await timesAsync(numBrowsers, mkBrowser)
      this.browser = this.browsers[0]
    })

    after(async function() {
      if (this.browsers) {
        await mapAsync(this.browsers, b => b.close())
      }

      if (this.closeServer) {
        await this.closeServer()
      }
    })

    beforeEach(async function() {
      await clearDatabase()
      await initTestData()

      this.pages = await mapAsync(this.browsers, b => b.newPage())
      this.page = this.pages[0]
      await mapAsync(this.pages, async p => {
        const cookies = await this.page.cookies()
        await this.page.deleteCookie(...cookies)
      })
    })

    afterEach(async function() {
      await mapAsync(this.pages, p => p.close())
    })

    func()
  })
}

export async function mkBrowser() {
  return await puppeteer.launch({
    args: runHeadless ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
    slowMo: 0,
    headless: runHeadless,
    timeout: 10000,
    defaultViewport: { width: 1920, height: 1080 },
  })
}

export async function navigate(page, path) {
  await page.goto(`http://localhost:${PORT}${path}`)
}

export async function resetSession(page) {
  const cookies = await page.cookies()
  await page.deleteCookie(...cookies)
  await navigate(page, "/")
}

export async function existsInPage(page, selector) {
  return await countInPage(page, selector, 1)
}

export async function countInPage(page, selector, count) {
  await page.waitForSelector(selector, { visible: true })
  const elements = await page.$$(selector)
  assert.strictEqual(elements.length, count)
}

// Waits until the element exists and clicks it
export async function click(page, selector) {
  await page.waitForSelector(selector)
  await page.click(selector)
}

async function timesAsync(n, func) {
  const results = []
  for (let i = 0; i < n; i++) {
    results.push(await func())
  }
  return results
}

async function mapAsync(xs, func) {
  return await Promise.all(xs.map(func))
}
