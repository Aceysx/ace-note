export default (state = {
  path: null,
  content: null,
  mtime: ''
}, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_EDIT_FILE':
      return action.data
    default:
      return state
  }
}
