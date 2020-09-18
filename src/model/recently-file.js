import File from '../model/file'

const RecentlyFile = {
  parseFileNameChange: (recentlyFiles, oldPath, newFileName) => {
    let relativePath = File.relativePath(oldPath);
    let files = recentlyFiles.filter(_path => _path !== relativePath);
    files.unshift(File.join([File.dir(relativePath), newFileName]))
    return files
  }
}

export default RecentlyFile