export const UPDATE_FILES = data => update('UPDATE_FILES', data)
export const UPDATE_SELECTED_DIR = data => update('UPDATE_SELECTED_DIR', data)
export const UPDATE_CURRENT_EDIT_FILE = data => update('UPDATE_CURRENT_EDIT_FILE', data)
export const UPDATE_NOTES_TAGS = data => update('UPDATE_NOTES_TAGS', data)
export const UPDATE_STATUS = data => update('UPDATE_STATUS', data)
export const UPDATE_TIMECARD_YEAR = data => update('UPDATE_TIMECARD_YEAR', data)
export const UPDATE_CARDS_REVIEW = data => update('UPDATE_CARDS_REVIEW', data)
export const UPDATE_TIMECARD_PLANS = data => update('UPDATE_TIMECARD_PLANS', data)
export const UPDATE_TIMECARD_LABELS = data => update('UPDATE_TIMECARD_LABELS', data)
export const UPDATE_PLAN_TEMPLATES = data => update('UPDATE_PLAN_TEMPLATES', data)
export const UPDATE_RECENTLY_FILES = data => update('UPDATE_RECENTLY_FILES', data)


const update = (type, data) => {
  return {type, data}
}