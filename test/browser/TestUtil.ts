import assert from "assert"
import puppeteer from "puppeteer"
import {start} from "../../src/server/app"
import {clearDatabase} from "../../src/server/mongo"

const PORT = "3001"
const runHeadless = !!process.env.CI

export function browserSpec(name, func) {
  describe(name, function() {
    before(async function() {
      this.closeServer = await start(PORT)
      this.browser = await mkBrowser()
    })

    after(async function() {
      this.browser.close()
      await this.closeServer()
    })

    beforeEach(async function() {
      await clearDatabase()

      this.page = await this.browser.newPage()
      const cookies = await this.page.cookies()
      await this.page.deleteCookie(...cookies)
    })

    afterEach(async function() {
      await this.page.close()
    })

    func()
  })
}

export async function mkBrowser() {
  return await puppeteer.launch({
    slowMo: runHeadless ? 0 : 50,
    headless: runHeadless,
    timeout: 2000,
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
  await page.waitForSelector(selector, {visible: true})
  const elements = await page.$$(selector)
  assert.strictEqual(elements.length, count);
}
