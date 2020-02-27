import moment from "moment"

const Time = {
  isSameDay: (one, another) => {
    return moment(one).isSame(another, 'day')
  },
  diff: (one, another, intervalDay) => {
    return Time.interval(one, another) === intervalDay
  },
  interval: (one, another) => {
    return moment(Time.format(another)).diff(
      moment(Time.format(one)), 'days')
  },
  add: (current, days) => {
    return moment(current).add('days', days).valueOf()
  },
  format: timestamps => {
    return moment(timestamps).format("YYYY-MM-DD")
  }
}
export default Time