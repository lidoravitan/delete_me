const router = require('express').Router()

const User = require('../../models/User')

const mongo = require('../../utilities/Mongoose')

const { withUserAuthentication } = require('./services')

router
  // public
  .post('/signup', mongo.createResource(User))
  .post('/authenticate', withUserAuthentication)
  // protected
  .get('/me', mongo.getResourcesByQuery(User))
  .put('/me/:id', mongo.updateResource(User))
  .use(mongo.useResolveDocumnet)

module.exports = router
