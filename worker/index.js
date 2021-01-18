const redis = require('redis')
const keys = require('./keys')

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

const sub = client.duplicate()

const fib = index => 
  index < 2
    ? 1
    : fib(index - 1) + fib(index - 2)

sub.on('message', (channel, message) => {
  client.hset('values', message, parseInt(fib(message)))
})

sub.subscribe('insert')