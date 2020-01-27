export default (state = [], action) => {
  switch (action.type) {
    case 'SELECTED_DIR_STACK':
      return action.data
    default:
      return state
  }
}
