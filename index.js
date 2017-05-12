'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { parse } = require('url')
const { json, send } = require('micro')
const match = require('micro-match')
const config = require('./config')
const addOrUpdate = require('./lib/add-or-update')
const deleteDocument = require('./lib/delete-document')
const search = require('./lib/search')
const validateJwt = require('./lib/validate-jwt')

module.exports = async (req, res) => {
  const {query, pathname} = await parse(req.url, true)
  const data = ['POST', 'PUT'].includes(req.method) ? await json(req) : query
  let result = {}
  if (['POST', 'PUT'].includes(req.method)) {
    const jwt = req.headers.authorization
    const decoded = await validateJwt({jwt: jwt, tokenKey: config.tokenKey})
    if (decoded) {
      const {id} = match('/:id', req.url)
      let action = 'add'
      if (id && req.method === 'POST') {
        action = 'update'
      }
      const options = {
        action: action,
        id: id,
        data: data
      }
      result = await addOrUpdate(options)
    }
  } else if (req.method === 'DELETE') {
    const jwt = req.headers.authorization
    const decoded = await validateJwt({jwt: jwt, tokenKey: config.tokenKey})
    if (decoded) {
      const {id} = match('/:id', req.url)
      const options = {
        action: 'delete',
        id: id,
        data: data
      }
      result = await deleteDocument(options)
    }
  } else if ((req.method === 'GET' && data.id !== undefined) || pathname === '/search') {
    result = await search(data)
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    result = await marked(readme)
  }
  let status = result.error ? 500 : 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  send(res, status, result)
}
