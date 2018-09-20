const timeout = 10000
// typingSpeed value is set for wait time between keystrokes. Simulates realistic typing.
const typingSpeed = 50

describe(
  'Google search test',
  () => {
    let page
    beforeAll(async () => {
      jest.setTimeout(timeout)
      page = await global.__BROWSER__.newPage()
      await page.goto('https://google.com')
    }, timeout)

    afterEach(async () => {
      await page.waitFor(1000)
    })

    afterAll(async () => {
      await page.close()
    })

    it('Google homepage loads', async () => {
      await page.waitForSelector('img[alt="Google"]')
      await page.waitForSelector('input[type="text"]')
      await page.waitForSelector('input[type="submit"]')
      await page.type('input[type="text"]', 'Stack Overflow', {delay: typingSpeed})
      await page.click('input[type="submit"]')
    })

    it('Navigate to the first result', async () => {
      await page.click('#rso > div:nth-child(1) > div > div > div > div > h3 > a')
      await page.waitFor(1000)
    })

  },
  timeout
)
