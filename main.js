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

ipcMain.on('init', (event, data) => {
  event.sender.send('init-done', Files.listFilesDeep(process.cwd() + '/src'))
})

ipcMain.on('find-sub-files', (event, path) => {
  event.returnValue = Files.listFiles(path)
})

ipcMain.on('open-file', (event, file) => {
  const {type} = file
  if (type === 'file') {
    event.sender.send('open-file-done', Files.readFile(file.path));
  }
})
app.on('ready', createWindow)