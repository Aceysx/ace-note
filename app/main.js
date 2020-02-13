const {app, BrowserWindow, globalShortcut} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const SHORTCUTS = require('./main-process/constants/shortcuts')
require('./main-process/listener')
let win

const registerAllShortcuts = () => {
  Object.values(SHORTCUTS)
    .forEach(cmd => {
      globalShortcut.register(cmd, () => {
        win.webContents.send(cmd, cmd)
      })
    })
}

const createWindow = () => {
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

  registerAllShortcuts()
}

app.on('ready', createWindow)

app.on('browser-window-blur', () => {
  globalShortcut.unregisterAll()
})

app.on('browser-window-focus', () => {
  registerAllShortcuts()
})
