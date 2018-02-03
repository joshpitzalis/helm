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
