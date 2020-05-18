import Time from "./time"
import File from './file'

const CardReview = {
  INTERVAL: [0, 1, 2, 4, 7, 15, 30, 60],
  STATUS: {NOT_REVIEW: 'not-review', OBLIVIOUS: 'oblivious', HARD: 'hard', EASY: 'easy'},
  ICONS: {'not-review': '🕳', 'oblivious': '💔', 'hard': '💘', 'easy': '💖'},

  updateCardFilePath: (oldPath, newFileName, cardsReview) => {
    return cardsReview.map(card => {
      if (card.path.startsWith(oldPath)
        || card.path.endsWith(oldPath)) {
        const newPath = File.join([File.dir(oldPath), newFileName])
        return {...card, path: card.path.replace(oldPath, newPath)}
      }
      return card
    })
  },
  updateToCardsReview: (cardsReview, filePath) => {
    const afterFilter = cardsReview.filter(item => item.path !== filePath)
    if (afterFilter.length === cardsReview.length) {
      return [...cardsReview, CardReview._createCard(filePath)]
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
    const lastReviewHistory = card.history.length
      ? card.history[card.history.length - 1]
      : card
    const planIntervals = CardReview.INTERVAL.slice(CardReview.INTERVAL.indexOf(lastReviewHistory.interval || 0) + 1)
    const intervalTimes = planIntervals.map((interval, index) => {
      return eval(planIntervals.slice(0, index + 1).join("+"))
    })
    return intervalTimes.some(interval => {
      const nextReviewTime = lastReviewHistory.nextReviewTime || lastReviewHistory.reviewTime
      return Time.diff(nextReviewTime, current, interval)
    })
  },
  reviewCard: (cardsReview, _path, status) => {
    return cardsReview.map(card => {
      if (card.path === _path) {
        const lastReviewInterval = card.history.length
          ? card.history[card.history.length - 1].interval
          : 0
        const nextInterval = CardReview._nextInterval(status, lastReviewInterval)
        const nextReviewTime = Time.add(card.nextReviewTime, nextInterval === 0 ? 1 : nextInterval + 1)
        const isFinish = nextInterval === CardReview.INTERVAL[CardReview.INTERVAL.length - 1]

        if (card.history.length === 0) {
          return Object.assign({},
            {
              ...card,
              nextReviewTime: Time.add(card.nextReviewTime, 1)
            },
            {history: [...card.history, CardReview._createReviewHistory(status, 0, Time.today())]})
        }
        return Object.assign({},
          {...card, isFinish, nextReviewTime},
          {history: [...card.history, CardReview._createReviewHistory(status, nextInterval, Time.today())]})
      }
      return card
    })
  },
  isTodayReviewed: (card, current) => {
    return Time.isSameDay(current, card.nextReviewTime)
      && Time.isSameDay(card.nextReviewTime, Time.today())
  },
  getStatusIcon: status => {
    return CardReview.ICONS[status]
  },
  status: (card, current) => {
    if (Time.interval(Time.today(), current) > 0 || Time.isSameDay(card.nextReviewTime, current)) {
      return CardReview.STATUS.NOT_REVIEW
    }
    const found = card.history.find(item => {
      return Time.isSameDay(item.reviewTime, current)
    })
    return found ? found.status : CardReview.STATUS.NOT_REVIEW
  },
  expireCardsReaper: cards => {
    return cards.map(card => {
      if (Time.interval(card.nextReviewTime, Time.today()) > 0) {
        return Object.assign({},
          {...card, nextReviewTime: Time.today()},
          {
            history: [...card.history,
              CardReview._createReviewHistory(
                CardReview.STATUS.NOT_REVIEW,
                0, card.nextReviewTime
              )]
          })
      }
      return card
    })
  },
  _nextInterval: (status, interval) => {
    const intervals = CardReview.INTERVAL
    const index = intervals.indexOf(interval)
    if (status === CardReview.STATUS.EASY) {
      return index === intervals.length ? interval : intervals[index + 1]
    }
    if (status === CardReview.STATUS.HARD) {
      return interval
    }
    return index === 0 ? interval : intervals[index - 1]
  },
  _isTodayInHistoryReview: (card, current) => {
    return card.history.find(item => {
      return Time.isSameDay(item.reviewTime, current)
    })
  },
  _createCard: filePath => {
    return {
      path: filePath,
      startReviewTime: Time.today(),
      nextReviewTime: Time.today(),
      isFinish: false,
      history: []
    }
  },
  _createReviewHistory: (status, interval, reviewTime) => {
    return {
      reviewTime,
      status,
      interval
    }
  }
}

export default CardReview