// const redis = require('redis').createClient({ host: 'localhost', port: 6379 })
const redis = require('redis').createClient({ host: 'redis-server', port: 6379 })
module.exports = redis
