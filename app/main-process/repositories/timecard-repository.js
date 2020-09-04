const low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let Files = require('../utils/files')
let db
const TimecardRepository = {
  init: _path => {
    if (db) {
      return
    }
    let planDBPath = _path + '/__timecard/'
    let filename = '__plan.json'
    let full = planDBPath + filename;
    if (Files.isExist(full)) {
      db = low(new FileSync(full))
      return
    }
    Files.createDirIfNotExist(planDBPath);
    Files.createFileWithContent(full);
    db = low(new FileSync(full))
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
  delByDate: (date) => {
    return db.get('plans')
      .remove({date})
      .write()
  },
  getPlansByYear: (year) => {
    if (db) {
      return db.get('plans')
        .filter(item => item.date.startsWith(year))
        .sortBy('date')
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