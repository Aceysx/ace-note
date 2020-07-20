export default (state = [
  {
    id: '',
    title: '',
    color: ''
  }
], action) => {
  if (action.type === 'UPDATE_TIMECARD_LABELS') {
    return action.data
  } else {
    return state
  }
}
