export default (state = new Date().getFullYear(), action) => {
  if (action.type === 'UPDATE_TIMECARD_YEAR') {
    return action.data
  } else {
    return state
  }
}
