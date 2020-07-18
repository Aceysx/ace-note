export default (state = [
  {
    date: '',
    title: '',
    isSummary: false,
    labels: [{1: 6}]
  }
], action) => {
  if (action.type === 'UPDATE_TIMECARD_PLANS') {
    return action.data
  } else {
    return state
  }
}
