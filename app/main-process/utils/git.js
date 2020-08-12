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
                resolve({isSuccess: false, message: '推送失败,请关联远程仓库'})
              }
              resolve({isSuccess: true, message: '推送成功'})
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
            message: '当前工作目录暂无更新'
          })
        }
        resolve({
          isSuccess: true,
          message: '创建成功'
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
            message: '推送失败，请确保\n1. 当前工作目录为git仓库 \n2. 确保配置了git repo ssh 密匙'
          })
        }
        resolve({
          isSuccess: true,
          message: 'git status 成功'
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
            message: '拉取失败，请手动解决冲突'
          })
        }
        resolve({
          isSuccess: true,
          message: '拉取成功'
        })
      })
    })
  }
}


module.exports = Git