const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { PORT } = require('./conf')
const Joi = require('joi')
const cors = require('cors')

Joi.objectId = require('joi-objectid')(Joi)

// connect DB
const { dbConnect } = require('./mongo')

dbConnect().then(() => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get('/', (request, response) => {
    response.json({ message: 'Server is runing!' })
  })

  app.use('/v1', require('./routes'))

  app.listen(PORT, '0.0.0.0', () =>
    console.log(`[Application] listening on port ${PORT}!`)
  )
})
