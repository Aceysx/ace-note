import { combineReducers } from 'redux'
import leftMenu from './left-menu'
import selectedDir from './selected-dir'
import currentEditFile from './current-edit-file'
import selectedDirStack from './selected_dir_stack'
import notesTags from './notes-tags'
import status from './status'
import cardsReview from './cards-review'
import timecardPlans from './timecard-plans'
import timecardLabels from './timecard-labels'

export default combineReducers({
  leftMenu,
  selectedDir,
  currentEditFile,
  selectedDirStack,
  notesTags,
  cardsReview,
  status,
  timecardPlans,
  timecardLabels
})
