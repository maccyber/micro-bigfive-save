'use strict'

module.exports = {
  tokenKey: process.env.BIGFIVE_SAVE_TOKEN_KEY || 'Gibberish, jibberish, jibber-jabber and gobbledygook',
  dbConnection: process.env.DB_CONNECTION || 'mongodb://localhost/bigfive',
  dbCollection: process.env.DB_COLLECTION || 'results'
}
