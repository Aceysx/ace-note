const {app, BrowserWindow, dialog} = require('electron')
require('./src/main-process/listener')
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

let dir;


app.on('ready', createWindow)
