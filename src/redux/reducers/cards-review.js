export default (state = [
  {
    path: 'test.txt',
    startReviewTime: 111,
    nextReviewTime: 111,
    isFinish: false,
    history: [{
      reviewTime: 1,
      status: 'strange',
      interval: 1 //距离上一次 review 间隔天数
    }]
  }
], action) => {
  if (action.type === 'UPDATE_CARDS_REVIEW') {
    return action.data
  } else {
    return state
  }
}
