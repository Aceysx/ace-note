import {
  CREATE_FILE_OR_DIR,
  FIND_FILE,
  FIND_SUB_FILES,
  INIT_NOTEBOOK_EVENT,
  MODIFY_FILE_CONTENT,
  MODIFY_FILE_NAME
} from "./listener-event";

const {ipcRenderer} = window.electron

const sendSync = (event, data = {}) => {
  return ipcRenderer.sendSync(event, data)
}

const FileResource = {
  initNoteBook: () => sendSync(INIT_NOTEBOOK_EVENT),
  findSubFiles: path => sendSync(FIND_SUB_FILES, path),
  findFile: path => sendSync(FIND_FILE, path),
  modifyFileName: path => sendSync(MODIFY_FILE_NAME, path),
  modifyFileContent: path => sendSync(MODIFY_FILE_CONTENT, path),
  createFileOrDir: data => sendSync(CREATE_FILE_OR_DIR, data),
}

export default FileResource