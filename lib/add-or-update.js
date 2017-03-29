'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.dbConnection)
const collection = db.collection(config.dbCollection)

module.exports = options => {
  return new Promise((resolve, reject) => {
    if (options.action === 'update') {
      const id = mongojs.ObjectID(options.id)
      collection.update({_id: id}, options.data, (error, document) => {
        if (error) {
          reject(error)
        } else {
          resolve({id: id})
        }
      })
    } else {
      let data = options.data
      if (options.id) {
        data._id = mongojs.ObjectID(options.id)
      }
      collection.save(data, (error, document) => {
        if (error) {
          reject(error)
        } else {
          resolve({id: document._id})
        }
      })
    }
  })
}
