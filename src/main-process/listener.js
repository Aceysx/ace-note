const {
  FIND_FILE,
  FIND_SUB_FILES,
  INIT_NOTEBOOK_EVENT,
  MODIFY_FILE_CONTENT,
  MODIFY_FILE_NAME,
  CREATE_FILE_OR_DIR,
  DELETE_FILE_OR_DIR,
  GET_NOTES_TAGS
} = require("../resources/listener-event")
const {NOTE_WORKSPACE_PATH, NOTES_TAGS_FILE} = require('../constant/constant')
const Files = require("./utils/files")
const {ipcMain} = require('electron')

ipcMain.on(INIT_NOTEBOOK_EVENT, (event) => {
  event.returnValue = Files.listFilesDeep(NOTE_WORKSPACE_PATH)
})

ipcMain.on(GET_NOTES_TAGS, (event) => {
  event.returnValue = JSON.parse(
    Files.readFile(NOTES_TAGS_FILE).content || '[]'
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
