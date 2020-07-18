const low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let Files = require('../utils/files')
let db
const TimecardRepository = {
  init: _path => {
    if (db) {
      return
    }
    let labelDBPath = _path + '/__timecard/__label.json'
    Files.createFileWithContent(labelDBPath)
    db = low(new FileSync(labelDBPath))
    db.defaults({
      labels: []
    }).write()
  },
  saveLabel: (label) => {
    db.get('labels').push(label).write()
  }
}

module.exports = TimecardRepository