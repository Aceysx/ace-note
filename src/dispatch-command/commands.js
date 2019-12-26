export const UPDATE_FILES = data => update('UPDATE_FILES', data)
export const UPDATE_SELECTED_DIR = data => update('UPDATE_SELECTED_DIR', data)


const update = (type, data) => {
  return {type, data}
}