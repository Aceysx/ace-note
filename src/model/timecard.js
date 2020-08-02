import TimecardResource from "../infrastructure/timecard-resource";

const TimecardModel = {
  createPlan: plan => {
    TimecardResource.createPlan(plan)
  },
  delPlan: plan => {
    TimecardResource.delPlan(plan.date)
  },
  getPlansByYear: year => {
    return TimecardResource.getPlansByYear(year)
  },
  getLabels: () => {
    return TimecardResource.getPlansLabels()
  }
}

export default TimecardModel