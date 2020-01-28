const {app, BrowserWindow} = require('electron')
require('./src/infrastructure/main-process/listener')
let win

function createWindow() {
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.maximize()
  win.show()
  win.loadURL('http://localhost:3000/')
  win.webContents.openDevTools()
}

app.on('ready', createWindow)
