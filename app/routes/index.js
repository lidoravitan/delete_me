const express = require('express')
const { useHandleError } = require('../utilities/ErrorHandler')

const { useValidateJsonWebToken } = require('../utilities/Authentication')

module.exports = express
  .Router()
  .get('/migrate', require('../migrate'))
  .use('/users', require('./Users'))
  .use('/posts', require('./Posts'))
  .use('/comments', require('./Comments'))
  .use(useValidateJsonWebToken)
  .use(useHandleError)
