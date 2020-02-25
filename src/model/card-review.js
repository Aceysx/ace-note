import Time from "./time"

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
  isTodayInReviewRange: (card, current) => {
    if (card.isFinish) {
      return false
    }
    if (Time.isSameDay(current, card.nextReviewTime)) {
      return true;
    }
    if (CardReview._isTodayInHistoryReview(card, current)) {
      return true;
    }
    const lastReviewTime = card.history.length
      ? card.history[card.history.length - 1]
      : card
    const planIntervals = CardReview.INTERVAL.slice(CardReview.INTERVAL.indexOf(lastReviewTime.interval || 0)+1)
    const intervalTimes =
      planIntervals
      .map((interval, index) => {
        return eval(planIntervals.slice(0, index + 1).join("+"))
      })
    return intervalTimes.some(interval => {
      const nextReviewTime = lastReviewTime.nextReviewTime || lastReviewTime.reviewTime
      return Time.diff(nextReviewTime, current, interval)
    })
  },
  _isTodayInHistoryReview: (card, current) => {
    return card.history.find(item => {
      return Time.isSameDay(item.reviewTime, current)
    })
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