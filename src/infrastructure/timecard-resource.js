import {CREATE_TIMECARD_PLAN, GET_TIMECARDS_BY_YEAR, GET_TIMECARDS_LABELS} from "../model/listener-event"

const {ipcRenderer} = window.electron

const sendSync = (event, data = {}) => {
  return ipcRenderer.sendSync(event, data)
}

const TimecardResource = {
  createPlan: (data) => sendSync(CREATE_TIMECARD_PLAN, data),
  getPlansByYear: year => sendSync(GET_TIMECARDS_BY_YEAR, year),
  getPlansLabels: () => sendSync(GET_TIMECARDS_LABELS),
}

export default TimecardResource