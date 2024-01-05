const { ipcRenderer } = require('electron');

const search = document.getElementById("button-search");

search.addEventListener("click", () => {
  const input = document.getElementById("search");
  const load = document.getElementById("loading");
  load.innerHTML = "Carregando, aguarde"
  
  const form = {
    search: input.value
  }

  ipcRenderer.send("send-message", form);
})

ipcRenderer.on('message-result', (event, mensagem) => {
  console.log('Mensagem recebida no processo de renderização:', mensagem);
});
ipcRenderer.on('message-error', (e,m) => {
  console.log("error")
})