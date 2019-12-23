const {app, BrowserWindow, ipcMain} = require('electron')
const Files = require('./src/utils/files')
let win

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('http://localhost:3000/')
  win.webContents.openDevTools()
}

ipcMain.on('asynchronous-message', (event) => {
  win.webContents.send('asynchronous-reply', Files.list(process.cwd() + '/src'))
  // event.sender.send('asynchronous-reply', 'sss')
})
app.on('ready', createWindow)