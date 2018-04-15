/**
 * @jest-environment node
 */

const puppeteer = require('puppeteer');

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};

let browser;
let page;

beforeAll(async () => {
  //   browser = await puppeteer.launch({});
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  page = await browser.newPage();
  await page.waitFor(4000);
  await page.goto('http://localhost:3000/fun');
  page.viewport({
    width: 500,
    height: 2400,
  });
});

describe('on page load', () => {
  test(
    'h1 loads correctly',
    async () => {
      const html = await page.$eval('[data-test="title"]', e => e.innerHTML);
      expect(html).toBe('Quick &amp; Easy <br> Online Polls.');
    },
    16000,
  );
});

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});
