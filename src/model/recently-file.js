import File from '../model/file'

const RecentlyFile = {
  limit: (recentlyFiles) => {
    return recentlyFiles.splice(0, 40)
  },
  parseFileNameChange: (recentlyFiles, oldPath, newFileName) => {
    let files = RecentlyFile.limit(recentlyFiles)
    let relativePath = File.relativePath(oldPath)
    files = files.filter(_path => _path !== relativePath);
    files.unshift(File.join([File.dir(relativePath), newFileName]))
    return files
  },
  parseFileNameOpen: (recentlyFiles, _path) => {
    let files = RecentlyFile.limit(recentlyFiles)
    let relativePath = File.relativePath(_path)
    files = files.filter(_path => _path !== relativePath);
    files.unshift(relativePath)
    return files
  },
  parseFileContentChange(recentlyFiles, _path) {
    let files = RecentlyFile.limit(recentlyFiles)

    let relativePath = File.relativePath(_path)
    files = files.filter(_path => _path !== relativePath)
    files.unshift(relativePath)
    return files
  },
  parseFileDelete: (recentlyFiles, _path) => {
    let files = RecentlyFile.limit(recentlyFiles)

    let relativePath = File.relativePath(_path)
    return files.filter(_path => _path !== relativePath)
  },
  parseDirNameChange: (recentlyFiles, parentPath, newPath) => {
    let files = RecentlyFile.limit(recentlyFiles)

    return files.map(_path => {
      return _path.replace(parentPath, newPath)
    });
  }
}

export default RecentlyFile