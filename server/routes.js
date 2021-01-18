const { Router } = require('express')
const pgClient = require('./postgres')
const redisClient = require('./redis')

const router = Router()

router.get('/all', async (req, res) => {
  try {
    const values = (await (await pgClient.query('SELECT * FROM values'))).rows
    res.status(200).json({ values })
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/current', async (req, res) => {
  redisClient.client.hgetall('values', (err, values) => {
    if(err) return res.status(500).json({ error: err.message })
      res.status(200).json({ values })
  })
})
  
router.put('/new', async (req, res) => {
  try {
    const { index } = req.body
  
    if(isNaN(index)) return res.status(422).json({ error: 'Index should be a number of type int' })
    if(parseInt(index) > 40) return res.status(422).json({ error: 'Index is too high' })
  
    redisClient.client.hset('values', index, 'nothing here')
    redisClient.publisher.publish('insert', index)
  
    pgClient.query('INSERT INTO values(number) VALUES($1)', [ index ])
  
    res.status(201).json({ added: true })
  } catch(err) {
    res.status(500).json({ 'error': err.message || 'postgres sucking again' })
  }
})

module.exports = router