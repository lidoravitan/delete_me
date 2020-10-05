const express = require('express')
const Model = require('../../models/Comment')

const mongo = require('../../utilities/Mongoose')

const resolveObjectIdQuery = ['id', '_id', 'author', 'post']

module.exports = express
  .Router()
  .get('/:id', mongo.getResourceById(Model))
  .get('/', mongo.getResourcesByQuery(Model, { resolveObjectIdQuery }))
  .delete('/:id', mongo.deleteResourceById(Model))
  .post('/', mongo.createResource(Model))
  .put('/:id', mongo.updateResource(Model))
  .use(mongo.useResolveDocumnet)
