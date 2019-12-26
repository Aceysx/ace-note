const fs = require('fs')

const listFilesDeep = (filePath, result) => {
  fs.readdirSync(filePath)
    .forEach(item => {
      const path = filePath + '/' + item
      const file = fs.statSync(path)
      let temp = {mtime: file.mtime, path, type: file.isFile() ? 'file' : 'dir'};
      result.push(temp);
      if (file.isDirectory()) {
        temp.sub = []
        listFilesDeep(path, temp.sub);
      }
    })
}
const listFiles = filePath => {
  return fs.readdirSync(filePath)
    .map(item => {
      const path = filePath + '/' + item
      const file = fs.statSync(path)
      return {
        mtime: file.mtime, path,
        type: file.isFile() ? 'file' : 'dir',
        sub: []
      }
    })
}
const Files = {
  listFilesDeep: path => {
    const file = fs.statSync(path)
    const dirs = {path, mtime: file.mtime, sub: [], type: file.isFile() ? 'file' : 'dir'}
    listFilesDeep(path, dirs.sub)
    return dirs
  },
  listFiles: path => {
    const file = fs.statSync(path)
    return {
      path, mtime: file.mtime, sub: listFiles(path),
      type: file.isFile() ? 'file' : 'dir'
    }
  },
  readFile: path => {
    return fs.readFileSync(path, 'utf8')
  }
}

module.exports = Files