export default (state={}, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DIR':
      return action.data
    default:
      return state
  }
}
