'use strict'

const connect = require('./connect')

module.exports = opts => {
  return new Promise((resolve, reject) => {
    if (!opts.data) {
      throw Error('opts.data not set')
    }
    if (!opts.collection) {
      throw Error('opts.collection not set')
    }
    connect(opts)
      .then(db => {
        const collection = db.collection(opts.collection)
        collection.insert(opts.data, (err, result) => {
          if (err) {
            return reject(err)
          } else {
            try {
              const res = {
                id: result.insertedIds[0]
              }
              return resolve(res)
            } catch (e) {
              return reject('Unknown error')
            }
          }
        })
      })
      .catch(reject)
  })
}
