const ErrorTypes = {
  GENERAL_ERROR: 'GENERAL_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
}

class ErrorHandler extends Error {
  constructor({ message, statusCode = 400, type = ErrorTypes.GENERAL_ERROR }) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.type = type
  }
}

const handleErrorMiddleware = (err, res) => {
  const { statusCode = 400, message, type } = err
  res.status(statusCode).json({
    type,
    statusCode,
    message,
  })
}

const useHandleError = (err, req, res, next) => {
  handleErrorMiddleware(err, res)
}

module.exports = {
  ErrorHandler,
  useHandleError,
  ErrorTypes,
}
