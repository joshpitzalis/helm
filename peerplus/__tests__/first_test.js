/**
 * @jest-environment node
 */

const puppeteer = require("puppeteer");

test(
  "First test",
  async () => {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".hello");

    const html = await page.$eval(".hello", e => e.innerHTML);
    expect(html).toBe("Landing");
    browser.close();
  },
  16000
);

// tk test that notifications show polls to be DONE
// tk test that notifications update in realtime
// tk make sure notifications dont show public polls

// tk private polls redirect to error page if user is not logged in
// tk private polls redirect to error page if user is not a participant
