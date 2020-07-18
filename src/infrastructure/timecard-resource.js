import {CREATE_TIMECARD_PLAN} from "../model/listener-event"

const {ipcRenderer} = window.electron

const sendSync = (event, data = {}) => {
  return ipcRenderer.sendSync(event, data)
}

const TimecardResource = {
  createPlan: (data) => sendSync(CREATE_TIMECARD_PLAN, data),
}

export default TimecardResource