const fs = require('fs')

const listFiles = (filePath, result) => {
  fs.readdirSync(filePath)
    .forEach(item => {
      const path = filePath + '/' + item
      const file = fs.statSync(path)
      let temp = {mtime: file.mtime, path, type: file.isFile() ? 'file' : 'dir'};
      result.push(temp);
      if (file.isDirectory()) {
        temp.sub = []
        listFiles(path, temp.sub);
      }
    })
}
const Files = {
  list: path => {
    const file = fs.statSync(path)
    const dirs = {path, mtime: file.mtime, sub: [], type: file.isFile() ? 'file' : 'dir'}
    listFiles(path, dirs.sub)
    return dirs
  },
  readFile: path => {
    return fs.readFileSync(path, 'utf8')
  }
}

module.exports = Files