const Joi = require('joi')

exports.validateGetResource = Joi.object().keys({
  email: Joi.string(),
  _id: Joi.objectId(),
  firstname: Joi.string(),
  lastname: Joi.string(),
  role: Joi.string(),
  size: Joi.string(),
})

exports.validateCreateResource = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().valid(['store']),
})

exports.validateAuthenticate = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
