const low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let Files = require('../utils/files')
let db
const TimecardRepository = {
  init: _path => {
    if (db) {
      return
    }
    let planDBPath = _path + '/__timecard/__plan.json'
    Files.createFileWithContent(planDBPath)
    db = low(new FileSync(planDBPath))
    db.defaults({
      labels: [],
      plans: [],
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