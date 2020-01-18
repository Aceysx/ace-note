const getNoteWorkspacePath = () => {
  return '/Users/xinsi/Documents/PERSONAL/notebook'
}

module.exports.NOTE_WORKSPACE_PATH = getNoteWorkspacePath()
module.exports.NOTES_TAGS_FILE = getNoteWorkspacePath() + '/__tags'
