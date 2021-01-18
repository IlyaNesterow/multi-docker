const redis = require('redis')
const keys = require('./keys')

//redis stuff
const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

const publisher = client.duplicate()

module.exports =  { client, publisher } 