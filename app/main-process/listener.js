const {
  FIND_FILE,
  FIND_SUB_FILES,
  INIT_NOTEBOOK_EVENT,
  MODIFY_FILE_CONTENT,
  MODIFY_FILE_NAME,
  CREATE_FILE_OR_DIR,
  DELETE_FILE_OR_DIR,
  GET_NOTES_TAGS,
  OPEN_DIR,
  PUSH_TO_REPO_FINISHED,
  PUSH_TO_REPO
} = require('./listener-event')
const Files = require('./utils/files')
const Git = require('./utils/git')
const {ipcMain, dialog} = require('electron')

ipcMain.on(INIT_NOTEBOOK_EVENT, (event, path) => {
  event.returnValue = Files.listFilesDeep(path)
})

ipcMain.on(GET_NOTES_TAGS, (event, path) => {
  event.returnValue = JSON.parse(
    Files.readFile(path).content || '[]'
  )
})

ipcMain.on(FIND_SUB_FILES, (event, path) => {
  event.returnValue = Files.listFiles(path)
})

ipcMain.on(FIND_FILE, (event, path) => {
  event.returnValue = Files.readFile(path)
})

ipcMain.on(MODIFY_FILE_NAME, (event, data) => {
  const {oldPath, newFileName} = data
  event.returnValue = Files.modifyFileName(oldPath, newFileName)
})

ipcMain.on(MODIFY_FILE_CONTENT, (event, data) => {
  const {path, content} = data
  event.returnValue = Files.modifyFileContent(path, content)
})

ipcMain.on(CREATE_FILE_OR_DIR, (event, data) => {
  const {path, type} = data
  event.returnValue = Files.createFileOrDir(path, type)
})

ipcMain.on(DELETE_FILE_OR_DIR, (event, data) => {
  const {path, type} = data
  event.returnValue = Files.deleteFileOrDir(path, type)
})

ipcMain.on(OPEN_DIR, (event) => {
  let dir = openDialogSync()
  while (!dir) {
    dir = openDialogSync()
  }
  event.returnValue = dir[0]
})


const openDialogSync = () => dialog.showOpenDialogSync({
  properties: ['createDirectory', 'openDirectory'],
  message: 'please select a directory'
})


// git resource
ipcMain.on(PUSH_TO_REPO, (event, workspace) => {
  Git.push(workspace).then(result => {
    event.sender.send(PUSH_TO_REPO_FINISHED, result)
  })
})
