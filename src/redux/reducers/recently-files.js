export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_RECENTLY_FILES':
      return action.data
    default:
      return state
  }
}
