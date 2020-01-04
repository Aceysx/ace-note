const fs = require('fs')
const path = require('path')

const listFilesDeep = (filePath, result) => {
  fs.readdirSync(filePath)
    .forEach(item => {
      const _path = filePath + '/' + item
      const file = fs.statSync(_path)
      let temp = {mtime: file.mtime, path: _path, type: file.isFile() ? 'file' : 'dir'};
      result.push(temp);
      if (file.isDirectory()) {
        temp.sub = []
        listFilesDeep(_path, temp.sub);
      }
    })
}
const listFiles = filePath => {
  return fs.readdirSync(filePath)
    .map(item => {
      const _path = filePath + '/' + item
      const file = fs.statSync(_path)
      return {
        mtime: file.mtime, path: _path,
        type: file.isFile() ? 'file' : 'dir',
        sub: []
      }
    })
}
const deleteDir = url => {
  let files = fs.readdirSync(url);
  files.forEach(function (file) {
    const curPath = path.join(url, file)

    if (fs.statSync(curPath).isDirectory()) {
      deleteDir(curPath);
    } else {
      fs.unlinkSync(curPath)
    }
  })
  fs.rmdirSync(url)
}

const Files = {
  listFilesDeep: _path => {
    const file = fs.statSync(_path)
    const dirs = {path: _path, mtime: file.mtime, sub: [], type: file.isFile() ? 'file' : 'dir'}
    listFilesDeep(_path, dirs.sub)
    return dirs
  },
  listFiles: _path => {
    const file = fs.statSync(_path)
    return {
      path: _path, mtime: file.mtime, sub: listFiles(_path),
      type: file.isFile() ? 'file' : 'dir'
    }
  },
  readFile: _path => {
    const file = fs.statSync(_path)
    return {
      path: _path,
      mtime: file.mtime,
      type: 'file',
      content: fs.readFileSync(_path, 'utf-8')
    }
  },
  modifyFileName: (oldPath, newFileName) => {
    const newFilePath = path.dirname(oldPath) + '/' + newFileName
    fs.renameSync(oldPath, newFilePath)
    return newFilePath
  },
  modifyFileContent: (_path, content) => {
    fs.writeFileSync(_path, content, 'utf-8')
    return Files.readFile(_path)
  },

  createFileOrDir: (_path, type) => {
    let fileName = path.join(_path, new Date().getTime().toString())
    if (type === 'dir') {
      fs.mkdirSync(fileName);
      return fileName
    }
    fileName += ('.' + type)
    fs.writeFileSync(fileName, '');
    return fileName
  },

  deleteFileOrDir: (_path, type) => {
    if (type === 'dir') {
      deleteDir(_path)
    } else {
      fs.unlinkSync(_path);
    }
    return _path
  }
}

module.exports = Files