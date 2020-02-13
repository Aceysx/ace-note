const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const SHORTCUTS = require('../src/model/shortcuts')
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


//shortcut
  Object.values(SHORTCUTS)
    .forEach(cmd => {
      globalShortcut.register(cmd, () => {
        win.webContents.send(cmd, cmd)
      })
    })
}

app.on('ready', createWindow)
