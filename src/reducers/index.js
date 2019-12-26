import { combineReducers } from 'redux'
import leftMenu from './left-menu'
import selectedDir from './selected-dir'
export default combineReducers({
  leftMenu,
  selectedDir
})
