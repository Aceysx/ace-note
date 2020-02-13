import * as SHORTCUTS from '../model/shortcuts'

const register = (shortcut, event) => {
  window.electron.ipcRenderer.on(shortcut, () => {
    event()
  })
}

const registerShortcuts = {
  leftMenuVisible: event => {
    register(SHORTCUTS.SWITCH_LEFT_MENU_VISIBLE_CMD, event)
  },
  subMenuVisible: event => {
    register(SHORTCUTS.SWITCH_SUB_MENU_VISIBLE_CMD, event)
  },
  searchModalVisible: event => {
    register(SHORTCUTS.SWITCH_SEARCH_BAR_VISIBLE_CMD, event)
  }
}

export default registerShortcuts