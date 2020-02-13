import MENU from '../../ui/note/menu-item'

export default (state = {
  current: MENU.NOTE,
  leftMenuVisible: true,
  subMenuVisible: true
}, action) => {
  if (action.type === 'UPDATE_STATUS') {
    return action.data
  }
  return state
}
