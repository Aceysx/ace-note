import moment from "moment"

const Time = {
  isSameDay: (one, another) => {
    return moment(one).isSame(another, 'day')
  }
}
export default Time