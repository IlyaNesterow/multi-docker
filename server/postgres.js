const { Pool } = require('pg')
const keys = require('./keys')

//Postgres server setup
const dbConfig = {
  host: keys.pgHost,
  port: keys.pgPort,
  user: keys.pgUser,
  database: keys.pdDb,
}
if(process.env.PROD)
  dbConfig.password = keys.pgPassword

const client = new Pool(dbConfig)
  
client.on('error', () => console.log('Lost PG connection'))
  
client.on('connect', () => {
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.log(err))
})

module.exports = client