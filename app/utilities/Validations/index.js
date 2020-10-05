const Joi = require('joi')

const validateReqBodyBySchema = (schema) => (req, res, next) => {
  Joi.validate(req.body, schema, (err, value) => {
    if (!err) return next()
    return next(err)
  })
}

const validateReqQueryParamsBySchema = (schema) => (req, res, next) => {
  Joi.validate(req.query, schema, (err, value) => {
    if (!err) return next()
    return next(err)
  })
}

module.exports = {
  validateReqQueryParamsBySchema,
  validateReqBodyBySchema,
}
