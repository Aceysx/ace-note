const {exec} = require('child_process')
const getCurrentTime = () => {
  return new Date()
}
const CMD = {
  status: 'git status',
  addAndCommit: 'git add . && git commit -m"updateState from AceNote: ' + getCurrentTime() + '"',
  pullReb: 'git pull origin master --reb',
  push: 'git push -u origin master'
}
const getDefaultConf = cwd => {
  return {
    cwd,
    timeout: 60 * 1000,
    encoding: 'utf8'
  }
}
const Git = {
  push: repo => {
    return Git.status(repo)
      .then(result => {
        if (result.isSuccess) {
          return Git.createCommit(repo)
        }
        return result
      })
      .then(result => {
        if (result.isSuccess) {
          return Git.pullReb(repo)
        }
        return result
      })
      .then(result => {
        if (result.isSuccess) {
          return new Promise((resolve) => {
            exec(CMD.push, getDefaultConf(repo), (err) => {
              if (err) {
                resolve({isSuccess: false, message: 'push failed, please make sure its ssh protocol with remote repo'})
              }
              resolve({isSuccess: true, message: 'push success'})
            })
          })
        }
        return result
      })
  },
  createCommit: repo => {
    return new Promise((resolve) => {
      exec(CMD.addAndCommit, getDefaultConf(repo), (err) => {
        if (err) {
          resolve({
            isSuccess: false,
            message: 'there is not any update'
          })
        }
        resolve({
          isSuccess: true,
          message: 'create success'
        })
      })
    })
  },
  status: repo => {
    return new Promise((resolve) => {
      exec(CMD.status, getDefaultConf(repo), (err) => {
        if (err) {
          resolve({
            isSuccess: false,
            message: 'push failed，please make sure\n1. current workspace is a git repo \n2. config git repo ssh key'
          })
        }
        resolve({
          isSuccess: true,
          message: 'git status success'
        })
      })
    })
  },
  pullReb: repo => {
    return new Promise((resolve) => {
      exec(CMD.pullReb, getDefaultConf(repo), (err) => {
        if (err) {
          resolve({
            isSuccess: false,
            message: 'pull failed，please resolve conflict manual'
          })
        }
        resolve({
          isSuccess: true,
          message: 'pull success'
        })
      })
    })
  }
}


module.exports = Git