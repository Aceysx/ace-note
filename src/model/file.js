import path from 'path'

const PINED = '「置顶」'
const File = {
  isPined: _path => {
    return path.basename(_path).startsWith(PINED)
  },
  unPin: _path => {
    return _path.replace(PINED, '')
  },
  pin: _path => {
    const dirName = path.dirname(_path)
    const fileName = path.basename(_path)
    return path.join(dirName, PINED + fileName)
  },
  name: _path => path.basename(_path),
  dir: _path => path.dirname(_path),
  join: _paths => path.join(..._paths),
}

export default File