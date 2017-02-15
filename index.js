'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { parse } = require('url')
const { json, send } = require('micro')
const config = require('./config')
const add = require('./lib/add')
const get = require('./lib/get')
const validateJwt = require('./lib/validate-jwt')

module.exports = async (req, res) => {
  const {query, pathname} = await parse(req.url, true)
  const data = req.method === 'POST' ? await json(req) : query
  let result = {}
  if (req.method === 'POST') {
    const jwt = req.headers.authorization
    const decoded = await validateJwt({jwt: jwt, tokenKey: config.tokenKey})
    if (decoded) {
      const opts = {
        config: config,
        collection: 'results',
        data: data
      }
      result = await add(opts)
    }
  } else if (pathname === '/help' && req.method === 'GET') {
    const readme = readFileSync('./README.md', 'utf-8')
    result = await marked(readme)
  } else if (req.method === 'GET') {
    const opts = {
      config: config,
      collection: 'results',
      search: data.id || {}
    }
    result = await get(opts)
  }
  let status = result.error ? 500 : 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  send(res, status, result)
}
