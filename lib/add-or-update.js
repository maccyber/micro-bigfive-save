'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.dbConnection)
const collection = db.collection(config.dbCollection)
const logger = require('./logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    if (options.action === 'update') {
      logger(['add-or-update', 'update', options.id])
      const id = mongojs.ObjectID(options.id)
      collection.update({_id: id}, options.data, (error, document) => {
        if (error) {
          logger(['add-or-update', 'update', options.id, 'error', error])
          reject(error)
        } else {
          logger(['add-or-update', 'update', options.id, 'success'])
          resolve({id: id})
        }
      })
    } else {
      logger(['add-or-update', 'add'])
      let data = options.data
      if (options.id) {
        logger(['add-or-update', 'add', 'got id', options.id])
        data._id = mongojs.ObjectID(options.id)
      }

      collection.save(data, (error, document) => {
        if (error) {
          logger(['add-or-update', 'save', 'error', error])
          reject(error)
        } else {
          logger(['add-or-update', 'save', document._id, 'success'])
          resolve({id: document._id})
        }
      })
    }
  })
}
