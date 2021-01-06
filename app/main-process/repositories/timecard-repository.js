const low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let Files = require('../utils/files')
let db
let dbPath
const TimecardRepository = {
  init: _path => {
    if (db && _path === dbPath) {
      return
    }
    dbPath = _path
    let planDBPath = _path + '/__timecard/'
    let filename = '__plan.json'
    let full = planDBPath + filename;
    if (Files.isExist(full)) {
      db = low(new FileSync(full))
      return
    }
    Files.createDirIfNotExist(planDBPath);
    Files.createFileWithContent(full, `
    {
        "labels": [],
        "plans": [],
        "planTemplates":[]
      }`);
    db = low(new FileSync(full))
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
  updateLabel: (label) => {
    const {id, title, color} = label
    return db.get('labels')
      .find({id})
      .assign({title, color})
      .write()
  },
  createLabel: (label) => {
    return db.get('labels')
      .push(label)
      .write()
  },
  createPlanTemplate: (template) => {
    template.id = new Date().getTime()
    return db.get('planTemplates')
      .push(template)
      .write()
  },
  updatePlanTemplate: (template) => {
    const {id, title, tasks} = template
    return db.get('planTemplates')
      .find({id})
      .assign({title, tasks})
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
  },
  getPlanTemplates: () => {
    if (db) {
      return db.get('planTemplates').value();
    }
    return []
  }
}

module.exports = TimecardRepository