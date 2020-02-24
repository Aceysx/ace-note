import {
  CREATE_FILE_OR_DIR,
  FIND_FILE,
  FIND_SUB_FILES,
  INIT_NOTEBOOK_EVENT,
  MODIFY_FILE_CONTENT,
  MODIFY_FILE_NAME,
  DELETE_FILE_OR_DIR,
  GET_NOTES_TAGS, OPEN_DIR, GET_CARDS_REVIEW
} from "../model/listener-event"

const {ipcRenderer} = window.electron

const sendSync = (event, data = {}) => {
  return ipcRenderer.sendSync(event, data)
}

const FileResource = {
  initNoteBook: _path => sendSync(INIT_NOTEBOOK_EVENT, _path),
  getNotesTags: _path => sendSync(GET_NOTES_TAGS, _path),
  getCardsReview: _path => sendSync(GET_CARDS_REVIEW, _path),
  findSubFiles: path => sendSync(FIND_SUB_FILES, path),
  findFile: path => sendSync(FIND_FILE, path),
  modifyFileName: path => sendSync(MODIFY_FILE_NAME, path),
  modifyFileContent: data => sendSync(MODIFY_FILE_CONTENT, data),
  createFileOrDir: data => sendSync(CREATE_FILE_OR_DIR, data),
  delete: data => sendSync(DELETE_FILE_OR_DIR, data),
  openDir: () => sendSync(OPEN_DIR),
}

export default FileResource