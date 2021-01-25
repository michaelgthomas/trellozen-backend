const env = process.env.NODE_ENV || 'development'

if (env !== 'test') {
  require('dotenv-safe').config({ silent: true }) // eslint-disable-line
}

console.log('test commit')
