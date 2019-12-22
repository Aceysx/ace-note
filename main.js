const {app, BrowserWindow} = require('electron')
function createWindow () {
  win = new BrowserWindow({width: 1000, height: 800})
  win.loadURL('http://localhost:3000/')
  win.webContents.openDevTools()

}
app.on('ready', createWindow)