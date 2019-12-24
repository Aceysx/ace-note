export const UPDATE_FILES = data => update('UPDATE_FILES', data)


const update = (type, data) => {
  return {type, data}
}