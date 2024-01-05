const { Automatize } = require("./automatize.model");

class Whatsapp extends Automatize {
  constructor(url) {
    super(url || 'https://web.whatsapp.com');
  }

  async awaitLogin() {
    await this.sleeper(20000);
  }

  async search(contact, text) {
    if(!this.page || !this.browser) throw "error";

    const xp = '//*[@id="side"]/div[1]/div/div[2]/div[2]/div/div[1]/p';
    const [el] = await this.page.$x(xp);
    if(!el || el.length === 0) throw "el não encontrada";

    el.click();
    await this.sleeper(3000);
    console.log("inserindo: " + contact);
    
    await this.byCharMessage(contact);

    await this.page.keyboard.sendCharacter("Enter");

    await this.byCharMessage(text);

    await this.page.keyboard.sendCharacter("Enter");
  }

  async byCharMessage(text) {
    for(let char of text) {
      await this.page.keyboard.sendCharacter(char);
      await this.sleeper(300);
    }
  }
}

module.exports = { Whatsapp };