export default (state = [
  {
    path: 'test.txt',
    startReviewTime: 111,
    nextReviewTime: 111,
    isFinish: false,
    history: [{
      reviewTime: 1,
      status: 'strange',
      interval: 1
    }]
  }
], action) => {
  if (action.type === 'UPDATE_CARDS_REVIEW') {
    return action.data
  } else {
    return state
  }
}
