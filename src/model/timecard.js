import TimecardResource from "../infrastructure/timecard-resource";

const TimecardModel = {
  createPlan: plan => {
    TimecardResource.createPlan(plan)
  },
  delPlan: plan => {
    TimecardResource.delPlan(plan.date)
  },
  createLabel: label => {
    return TimecardResource.createLabel(label)
  },
   updateLabel: label => {
    return TimecardResource.updateLabel(label)
  },
  getPlansByYear: year => {
    return TimecardResource.getPlansByYear(year)
  },
  getLabels: () => {
    return TimecardResource.getPlansLabels()
  }
}

export default TimecardModel