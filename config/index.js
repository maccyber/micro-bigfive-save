'use strict'

module.exports = {
  databaseURL: process.env.BIGFIVE_SAVE_DATABASE_URL || 'something.mlab.com',
  db: process.env.BIGFIVE_SAVE_DB || 'bigfive',
  user: process.env.BIGFIVE_SAVE_USER || 'bigfive',
  password: process.env.BIGFIVE_SAVE_PASSWORD || 'password',
  port: process.env.BIGFIVE_SAVE_PORT || 53659,
  tokenKey: process.env.BIGFIVE_SAVE_TOKEN_KEY || 'Gibberish, jibberish, jibber-jabber and gobbledygook',
  dbConnection: process.env.DB_CONNECTION || 'mongodb://localhost/bigfive',
  dbCollection: process.env.DB_COLLECTION || 'results'
}
