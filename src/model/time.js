import moment from "moment"

const Time = {
  isSameDay: (one, another) => {
    return moment(one).isSame(another, 'day')
  },
  diff:(one,another,intervalDay)=>{
    return moment(moment(another).format("YYYY-MM-DD"))
      .diff(moment(moment(one).format("YYYY-MM-DD")), 'days') === intervalDay
  }
}
export default Time