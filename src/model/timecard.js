import TimecardResource from "../infrastructure/timecard-resource";

const TimecardModel = {
  createPlan: plan => {
    TimecardResource.createPlan(plan)
  },
  getPlansByYear: year => {
    return TimecardResource.getPlansByYear(year)
  }
}

export default TimecardModel