import { combineReducers } from 'redux'
import leftMenu from './left-menu'
import selectedDir from './selected-dir'
import currentEditFile from './current-edit-file'
import selectedDirStack from './selected_dir_stack'

export default combineReducers({
  leftMenu,
  selectedDir,
  currentEditFile,
  selectedDirStack
})
