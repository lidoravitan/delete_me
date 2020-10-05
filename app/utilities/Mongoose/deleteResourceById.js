const { ErrorHandler } = require('../ErrorHandler')

const deleteResource = (Model) => (req, res, next) => {
  const resourceId = req.params.id
  Model.findOneAndDelete({ _id: resourceId }, (err, document) => {
    if (err) return next(new ErrorHandler({ message: err }))
    req.document = document
    next()
  })
}

module.exports = deleteResource
