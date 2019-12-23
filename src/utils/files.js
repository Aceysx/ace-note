const fs = require('fs')

const listFiles = (filePath, result) => {
  fs.readdirSync(filePath)
    .forEach(item => {
      const itemPath = filePath + '/' + item
      const file = fs.statSync(itemPath)
      result.push({type: file.isFile() ? 'file' : 'dir', path: itemPath})
      if (file.isDirectory()) {
        listFiles(itemPath, result);
      }
    })
}
const Files = {
  list: filePath => {
    const files = []
    listFiles(filePath, files)
    return files
  }
}

module.exports = Files