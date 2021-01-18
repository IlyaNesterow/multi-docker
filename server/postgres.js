const { Pool } = require('pg')
const keys = require('./keys')

//Postgres server setup
const client = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  database: keys.pdDb,
  //password: keys.pgPassword
})
  
client.on('error', () => console.log('Lost PG connection'))
  
client.on('connect', () => {
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.log(err))
})

module.exports = client