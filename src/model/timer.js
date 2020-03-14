import Time from "./time"
import moment from "moment"

const Timer = {
  expiredCardsReaperAndUpdate: func => {
    const nextUpdateTime = moment(Time.tomorrow().format("YYYY-MM-DD") + ' 01:00:00').valueOf()
    window.setTimeout(() => {
      func()
      window.setInterval(func, 24 * 3600)
    }, nextUpdateTime - Time.today())
  }
}

export default Timer