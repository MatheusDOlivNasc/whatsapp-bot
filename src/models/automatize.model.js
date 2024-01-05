const puppeteer = require('puppeteer');

class Automatize {
  url;
  page;
  browser;

  constructor(url) {
    this.url = url || "";
  }

  async init() {
    const browser = await puppeteer.launch({ headless: false });
    this.browser = browser;
    const page = await browser.newPage();
    await page.goto(this.url);
    this.page = page;
  }
  async close() {
    if(!this.browser) return;
    this.browser.close();
  }

  sleeper = (timer) => new Promise((res) => setTimeout(res, timer));

  setUrl(url) {
    this.url = url;
  }
  getUrl() {
    return this.url;
  }
  getBrowser() {
    return this.browser;
  }
  getPage() {
    return this.page;
  }
}

module.exports = { Automatize };