const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
require('./main-process/listener')
let win

function createWindow() {
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    titleBarStyle: 'hiddenInset'
  })
  win.maximize()

  win.loadURL(isDev
    ? 'http://localhost:3000/'
    : `file://${path.join(__dirname, './index.html')}`)
  if (isDev) {
    win.webContents.openDevTools();
  }
  win.once('ready-to-show', () => {
    win.show()
  })
}

app.on('ready', createWindow)
