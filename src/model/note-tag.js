import path from 'path'

const NoteTagModel = {
  findNoteTagsByPath: (notesTags, _path) => {
    const note = notesTags.find(note => note.path === _path) || {}
    return (note.tags || [])
  },
  findAllTags: notesTags => {
    return Array.from(new Set(notesTags.reduce((result, next) => {
      return result.concat(next.tags)
    }, [])))
  },
  updateNoteTags: (_path, notesTags, noteTags) => {
    let noteTag = notesTags.find(item => item.path === _path)
    if (noteTag) {
      noteTag.tags = noteTags
      noteTag.mtime = new Date().getTime()
    } else {
      notesTags.push({path: _path, tags: noteTags, mtime: new Date().getTime()})
    }
    return notesTags
  },
  updateNoteTagPath: (oldPath, newName, notesTags) => {
    let noteTag = notesTags.find(item => item.path === oldPath)
    if (noteTag) {
      noteTag.path = path.dirname(oldPath) + '/' + newName
    }
    return notesTags
  },
  exist: (_path, notesTags) => {
    return !!notesTags.find(item => item.path === _path)
  },
  delete: (_path, notesTags) => {
    return notesTags.filter(item => item.path !== path)
  }
}

export default NoteTagModel