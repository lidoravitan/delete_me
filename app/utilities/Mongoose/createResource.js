const { ErrorHandler } = require('../ErrorHandler')

const createResource = (Model) => (req, res, next) => {
  const model = new Model(req.body)
  model.save((err, document) => {
    if (err) next(new ErrorHandler({ message: err }))
    req.document = document
    return next()
  })
}

module.exports = createResource
