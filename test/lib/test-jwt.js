'use strict'

const test = require('ava')

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

test('generatating jwt', async t => {
  const jwt = generateJwt({tokenKey: config.tokenKey, payload: payload, options: options})
  const data = await validateJwt({jwt: jwt, tokenKey: config.tokenKey})
  t.deepEqual(data.name, 'maccyber', 'jwt generate and validate OK')
})

test('generatating failing jwt', async t => {
  const jwt = generateJwt({tokenKey: 'wrongtoken', payload: payload, options: options})
  const error = await t.throws(validateJwt({jwt: jwt, tokenKey: config.tokenKey}))
  t.deepEqual(error.message, 'Given token or data is invalid', 'jwt validate fail')
})
