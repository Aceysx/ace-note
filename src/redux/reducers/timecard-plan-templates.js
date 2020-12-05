export default (state = [], action) => {
  if (action.type === 'UPDATE_PLAN_TEMPLATES') {
    return action.data
  } else {
    return state
  }
}
