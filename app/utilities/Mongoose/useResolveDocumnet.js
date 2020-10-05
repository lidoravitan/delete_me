const jwt = require('jsonwebtoken')
const config = require('../../conf')
const { ErrorHandler } = require('../ErrorHandler')

const resolveMongooseHelpers = (req) => {
  return { data: req.document, ...req.documentData }
}
const useResolveDocumnet = (req, res, next) => {
  if (req.document === undefined) return next()
  res.json(resolveMongooseHelpers(req))
}

module.exports = {
  useResolveDocumnet,
}
