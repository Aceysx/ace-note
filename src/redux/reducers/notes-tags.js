// notesTags:[
//   {
//     path:'', // file relative path
//     tags:'a,b',
//    ctime:timestamp，
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
