'use strict'

const MongoClient = require('mongodb').MongoClient

module.exports = opts => {
  return new Promise((resolve, reject) => {
    if (!opts.config.user) {
      throw Error('opts.config.user not set')
    }
    if (!opts.config.password) {
      throw Error('opts.config.password not set')
    }
    if (!opts.config.databaseURL) {
      throw Error('opts.config.databaseURL not set')
    }
    if (!opts.config.port) {
      throw Error('opts.config.port not set')
    }
    if (!opts.config.db) {
      throw Error('opts.config.db not set')
    }
    const url = `mongodb://${opts.config.user}:${opts.config.password}@${opts.config.databaseURL}:${opts.config.port}/${opts.config.db}`
    MongoClient.connect(url, (err, db) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(db)
      }
    })
  })
}
