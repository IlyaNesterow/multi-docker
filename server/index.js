const express = require('express')
const cors = require('cors')
const router = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/test', (req, res) => res.send('Hi, there'))

app.use('/values', router)

app.listen(5000, () => console.log('listening'))