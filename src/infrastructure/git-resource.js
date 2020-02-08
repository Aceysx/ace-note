import {PUSH_TO_REPO} from '../model/listener-event'

const {ipcRenderer} = window.electron

const send = (event, data = {}) => {
  return ipcRenderer.send(event, data)
}

const GitResource = {
  pushToRepo: (workspace) => send(PUSH_TO_REPO, workspace),
}

export default GitResource