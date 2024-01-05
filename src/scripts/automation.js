const puppeteer = require('puppeteer');
const { Whatsapp } = require('../models/whatsapp.model');

let browser;

async function sendMessage(formData) {
  return new Promise(async (res, rej) => {
    let browser
    try {
      
      const w = new Whatsapp();
      console.log('init')
      await w.init();
      console.log('get browser')
      browser = w.getBrowser();
      console.log('await login')
      await w.awaitLogin();
      console.log('init search')
      await w.search(formData.contact, formData.message);

      return res("deu certo");
    } catch (error) {
      console.log(error)
      if(browser) browser.close();
      return rej(error || "error");
    }
  })
}


module.exports = { sendMessage };