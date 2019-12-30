const {app, BrowserWindow, ipcMain} = require('electron')
const Files = require('./src/main-process/utils/files')
let win

function createWindow() {
  win = new BrowserWindow({
    show: false,
    webPreferences: { // react 中可以设置 ipc
      nodeIntegration: true
    }
  })
  win.maximize()
  win.show()
  win.loadURL('http://localhost:3000/')
  win.webContents.openDevTools()
}

ipcMain.on('init', (event) => {
  event.sender.send('init-done', Files.listFilesDeep('/Users/xinsi/Documents/Gridea'))
})

ipcMain.on('find-sub-files', (event, path) => {
  event.returnValue = Files.listFiles(path)
})

ipcMain.on('open-file', (event, path) => {
  event.returnValue = Files.readFile(path)
})
ipcMain.on('modify-file-name', (event, data) => {
  const {oldPath, newFileName} = data
  event.returnValue = Files.modifyFileName(oldPath, newFileName)
})
ipcMain.on('modify-file-content', (event, data) => {
  const {path, content} = data
  event.returnValue = Files.modifyFileContent(path, content)
})
app.on('ready', createWindow)