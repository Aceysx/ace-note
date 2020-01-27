export default (state = {sub:[]}, action) => {
  switch (action.type) {
    case 'UPDATE_FILES':
      return action.data
    default:
      return state
  }
}
