'use strict'

const jwt = require('jsonwebtoken')

module.exports = opts => {
  return new Promise((resolve, reject) => {
    if (!opts) {
      throw Error('Missing required input: opts')
    }
    if (!opts.jwt) {
      throw Error('Missing required input: opts.jwt')
    }
    if (!opts.tokenKey) {
      throw Error('Missing required input: opts.tokenKey')
    }
    jwt.verify(opts.jwt, opts.tokenKey, (err, decoded) => {
      if (err) {
        return reject(Error('Given token or data is invalid'))
      } else {
        return resolve(decoded)
      }
    })
  })
}
