import {
  CREATE_TIMECARD_LABEL,
  CREATE_TIMECARD_PLAN,
  CREATE_TIMECARD_PLAN_TEMPLATE,
  DELETE_TIMECARD_PLAN,
  GET_TIMECARD_PLAN_TEMPLATES,
  GET_TIMECARDS_BY_YEAR,
  GET_TIMECARDS_LABELS,
  UPDATE_TIMECARD_LABEL
} from "../model/listener-event"

const {ipcRenderer} = window.electron

const sendSync = (event, data = {}) => {
  return ipcRenderer.sendSync(event, data)
}

const TimecardResource = {
  createPlan: (data) => sendSync(CREATE_TIMECARD_PLAN, data),
  createPlanTemplate: (data) => sendSync(CREATE_TIMECARD_PLAN_TEMPLATE, data),
  getPlansByYear: year => sendSync(GET_TIMECARDS_BY_YEAR, year),
  delPlan: date => sendSync(DELETE_TIMECARD_PLAN, date),
  updateLabel: label => sendSync(UPDATE_TIMECARD_LABEL, label),
  createLabel: label => sendSync(CREATE_TIMECARD_LABEL, label),
  getPlansLabels: () => sendSync(GET_TIMECARDS_LABELS),
  getPlanTemplates: () => sendSync(GET_TIMECARD_PLAN_TEMPLATES),
}

export default TimecardResource