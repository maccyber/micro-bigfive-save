'use strict'

const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.dbConnection)
const collection = db.collection(config.dbCollection)

module.exports = data => {
  return new Promise((resolve, reject) => {
    const search = data.id ? {_id: mongojs.ObjectID(data.id)} : data || {}
    collection.find(search, (error, documents) => {
      if (error) {
        reject(error)
      } else {
        resolve(documents)
      }
    })
  })
}
