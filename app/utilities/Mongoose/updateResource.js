const { ErrorHandler } = require('../ErrorHandler')

const updateResource = (Model) => (req, res, next) => {
  const resourceId = req.params.id

  const body = Object.keys(req.body).reduce(
    (acc, key) => {
      if (req.body[key] === null) {
        acc.$unset[key] = 1
      } else {
        acc[key] = req.body[key]
      }
      return acc
    },
    {
      $unset: {},
    }
  )

  Model.findOneAndUpdate(
    { _id: resourceId },
    body,
    { new: true },
    (err, document) => {
      if (err) return next(new ErrorHandler({ message: err }))
      req.document = document
      next()
    }
  )
}

module.exports = updateResource
