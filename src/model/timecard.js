import TimecardResource from "../infrastructure/timecard-resource";

const TimecardModel = {
  createPlan: plan => {
    TimecardResource.createPlan(plan)
  },
  createPlanTemplate: planTemplate => {
    TimecardResource.createPlanTemplate(planTemplate)
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
  },
  getPlanTemplates: () => {
    return TimecardResource.getPlanTemplates()
  }
}

export default TimecardModel