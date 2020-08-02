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
    if (Files.isExist(planDBPath)) {
      db = low(new FileSync(planDBPath))
      return
    }
    Files.createFileWithContent(planDBPath);
    db = low(new FileSync(planDBPath))
    console.log(db)
    if (!db) {
      db.defaults({
        labels: [],
        plans: [],
      }).write();
    }

  },
  savePlan: (plan) => {
    let plans = db.get('plans');
    let found = plans.find({date: plan.date});
    if (found.value()) {
      return found.assign(plan).write()
    }
    plans.push(plan).write()
  },
  getPlansByYear: (year) => {
    if (db) {
      return db.get('plans')
        .filter(item => item.date.startsWith(year))
        .value()
        .reverse();
    }
    return []
  },
  getLabels: () => {
    if (db) {
      return db.get('labels').value();
    }
    return []
  }
}

module.exports = TimecardRepository