'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.dbConnection)
const collection = db.collection(config.dbCollection)
const logger = require('./logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    logger(['delete', options.id])
    const id = mongojs.ObjectID(options.id)
    collection.remove({_id: id}, true, (error, document) => {
      if (error) {
        logger(['delete', options.id, 'error', error])
        reject(error)
      } else {
        logger(['delete', options.id, 'success'])
        resolve({id: options.id})
      }
    })
  })
}
