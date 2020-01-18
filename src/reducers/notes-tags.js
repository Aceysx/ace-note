// notesTags:[
//   {
//     path:'',
//     tags:'a,b',
//    mtime:timestamp，
//    color:''
//   }
// ]

export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_NOTES_TAGS':
      return action.data
    default:
      return state
  }
}
