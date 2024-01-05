const { ipcRenderer } = require('electron');

const search = document.getElementById("button-search");
const load = document.getElementById("loading");

search.addEventListener("click", () => {
  const iContact = document.getElementById("contact");
  const iMessage = document.getElementById("message");
  
  load.innerHTML = "Carregando, aguarde..."
  
  const form = {
    contact: iContact.value,
    message: iMessage.value
  }

  ipcRenderer.send("send-message", form);
})

ipcRenderer.on('message-result', () => {
  load.innerHTML = "Enviado com sucesso"
});
ipcRenderer.on('message-error', () => {
  load.innerHTML = "Erro no envio"
})