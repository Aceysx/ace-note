// {
//   date: '',
//   title: '',
//   summary: '',
//   type: '',
//   tasks: [{
//   title:'',
//   labels:{"1": 6}
// }]
// }
// ]
export default (state = [], action) => {
  if (action.type === 'UPDATE_TIMECARD_PLANS') {
    return action.data
  } else {
    return state
  }
}
