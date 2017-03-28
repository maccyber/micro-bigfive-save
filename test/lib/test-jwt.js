'use strict'

const tap = require('tap')

const generateJwt = require('../../lib/generate-jwt')
const validateJwt = require('../../lib/validate-jwt')
const config = require('../../config')

const payload = {
  name: 'maccyber',
  description: 'jibberjabber'
}
const options = {
  expiresIn: '1h',
  issuer: 'https://auth.t-fk.no'
}
tap.test('generatating jwt', (t) => {
  const jwt = generateJwt({tokenKey: config.tokenKey, payload: payload, options: options})
  validateJwt({jwt: jwt, tokenKey: config.tokenKey}).then(data => {
    t.equal(data.name, 'maccyber', 'jwt generate and validate OK')
    t.end()
  })
})

tap.test('generatating failing jwt', (t) => {
  const jwt = generateJwt({tokenKey: 'wrongtoken', payload: payload, options: options})
  validateJwt({jwt: jwt, tokenKey: config.tokenKey}).catch(err => {
    t.equal(err.message, 'Given token or data is invalid', 'jwt validate fail')
    t.end()
  })
})
