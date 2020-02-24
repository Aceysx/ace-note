const CardReview = {
  INTERVAL: [0, 1, 2, 4, 7, 15, 30, 60],
  STATUS: {NO_REVIEW: 'no-review', STRANGE: 'strange', JUST_SO_SO: 'just-so-so', WELL: 'well'},
  updateToCardsReview: (cardsReview, filePath) => {
    const afterFilter = cardsReview.filter(item => item.path !== filePath)
    if (afterFilter.length === cardsReview.length) {
      return [...cardsReview, CardReview._create(filePath)]
    }
    return afterFilter
  },
  _create: filePath => {
    const current = new Date().getTime()
    return {
      path: filePath,
      startReviewTime: current,
      nextReviewTime: current,
      isFinish: false,
      history: []
    }
  }
}

export default CardReview