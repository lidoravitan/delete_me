const jwt = require('jsonwebtoken')
const { SECRET_KEY, X_HEADER_WEBIT_TOKEN } = require('../../conf')
const { ErrorHandler, ErrorTypes } = require('../ErrorHandler')

const ERROR_MESSAGE = 'not authorized.'
const composeJsonWebToken = ({ user, store, app, superadmin }) => {
  if (!store && !superadmin) return
  return jwt.sign({ user, store, app, superadmin }, SECRET_KEY, {
    expiresIn: '2d',
  })
}

const useValidateJsonWebToken = (req, res, next) => {
  const token = req.headers[X_HEADER_WEBIT_TOKEN]

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return next(
        new ErrorHandler({
          message: ERROR_MESSAGE,
          statusCode: 401,
          type: ErrorTypes.AUTHENTICATION_ERROR,
        })
      )
    const { user } = decoded

    req.user = user

    next()
  })
}

module.exports = {
  useValidateJsonWebToken,
  composeJsonWebToken,
}
