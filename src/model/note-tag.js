import File from './file'

const NoteTagModel = {
  format: tag => {
    const colorAndContent = tag.split('||')
    const color = colorAndContent.length === 2 ? colorAndContent[0] : ''
    const content = colorAndContent.length === 2 ? colorAndContent[1] : colorAndContent[0]
    return [color, content]
  },
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
      noteTag.path = File.dir(oldPath) + '/' + newName
    }
    return notesTags
  },
  updateNoteTagDirPath: (oldPath, newPath, notesTags) => {
    return notesTags.map(tag => {
      if (tag.path.startsWith(oldPath)) {
        return {...tag, path: tag.path.replace(oldPath, newPath)}
      }
      return tag
    })
  },
  exist: (_path, notesTags) => {
    return !!notesTags.find(item => item.path === _path)
  },
  delete: (_path, notesTags) => {
    return notesTags.filter(item => item.path !== _path)
  }
}

export default NoteTagModel