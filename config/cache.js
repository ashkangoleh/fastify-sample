const redis = require('redis').createClient({ host: 'localhost', port: 6379 })
module.exports = redis