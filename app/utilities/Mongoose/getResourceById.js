const { ErrorHandler } = require('../ErrorHandler')

const getResourceById = (Model) => (req, res, next) => {
  return Model.findOne({ _id: req.params.id }, (err, document) => {
    if (err) return next(new ErrorHandler({ message: err }))
    req.document = document || {}
    next()
  })
}

module.exports = getResourceById
