import path from 'path'

const Files = {
  nameByPath: (filePath) => path.basename(filePath) + path.extname(filePath)
}
export default Files

