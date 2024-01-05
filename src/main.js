const { app, BrowserWindow, ipcMain } = require('electron');
const { sendMessage } = require("./scripts/automation");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  win.loadFile("render/index.html");

  win.webContents.on('did-finish-load', () => {
    ipcMain.on('send-message', (event, formData) => {
      sendMessage(formData)
        .then((res) => event.sender.send("message-result", res))
        .catch((error) => event.sender.send("message-error", error));
    })
  })
}

app.whenReady().then(createWindow);

app.on('window-all-close', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(BrowserWindow.getAllWindowns(). length === 0) {
    createWindow();
  }
})