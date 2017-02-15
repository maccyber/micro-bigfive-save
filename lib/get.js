'use strict'

const connect = require('./connect')
const ObjectID = require('mongodb').ObjectID

module.exports = opts => {
  return new Promise((resolve, reject) => {
    if (!opts.collection) {
      throw Error('opts.collection not set')
    }
    if (!opts.search) {
      throw Error('opts.search not set')
    }
    if (opts.search.length === 24) {
      opts.search = { '_id': ObjectID(opts.search) }
    }
    connect(opts)
      .then(db => {
        const collection = db.collection(opts.collection)
        collection.find(opts.search, (err, docs) => {
          if (err) {
            return reject(err)
          } else {
            return resolve(docs.toArray())
          }
        })
      })
      .catch(reject)
  })
}
