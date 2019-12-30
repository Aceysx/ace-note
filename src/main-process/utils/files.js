const fs = require('fs')
const path = require('path')

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
    const file = fs.statSync(path)
    return {
      path,
      mtime: file.mtime,
      type: 'file',
      content: fs.readFileSync(path, 'utf-8')
    }
  },
  modifyFileName: (oldPath, newFileName) => {
    const newFilePath = path.dirname(oldPath) + '/' + newFileName
    fs.renameSync(oldPath, newFilePath)
    return Files.readFile(newFilePath)
  },
  modifyFileContent: (path, content) => {
    fs.writeFileSync(path, content, 'utf-8')
    return Files.readFile(path)
  }
}

module.exports = Files