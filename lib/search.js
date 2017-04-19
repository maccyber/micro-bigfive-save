'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.dbConnection)
const collection = db.collection(config.dbCollection)
const logger = require('./logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const search = data.id ? {_id: mongojs.ObjectID(data.id)} : data || {}
    logger(['search', 'data', JSON.stringify(data)])
    collection.find(search, (error, documents) => {
      if (error) {
        logger(['search', 'error', error])
        reject(error)
      } else {
        logger(['search', 'data', JSON.stringify(data), 'hits', documents.length])
        resolve(documents)
      }
    })
  })
}
