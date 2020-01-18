import { combineReducers } from 'redux'
import leftMenu from './left-menu'
import selectedDir from './selected-dir'
import currentEditFile from './current-edit-file'
import selectedDirStack from './selected_dir_stack'
import notesTags from './notes-tags'

export default combineReducers({
  leftMenu,
  selectedDir,
  currentEditFile,
  selectedDirStack,
  notesTags
})
