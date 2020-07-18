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
    let labels = db.get('labels');
    let found = labels.find({date: label.date});
    if (found.value()) {
      return found.assign(label).write()
    }
    labels.push(label).write()
  }
}

module.exports = TimecardRepository