const jwt = require('jsonwebtoken')
const passport = require('passport')
const { X_HEADER_WEBIT_STORE } = require('../../conf')
const { ErrorHandler, ErrorTypes } = require('../ErrorHandler')

const useStoreAuthorization = (req, res, next) => {
  if (req.roles.superadmin) return next()
  const storeId = req.headers[X_HEADER_WEBIT_STORE]
  const isAuthorized = storeId === req.store

  isAuthorized
    ? next()
    : next(
        new ErrorHandler({
          type: ErrorTypes.AUTHORIZATION_ERROR,
          statusCode: 401,
        })
      )
}

const useExtractStoreId = (method, key) => (req, res, next) => {
  if (req.roles.superadmin) return next()
  req[method]['store'] = req.store
  next()
}

module.exports = {
  useStoreAuthorization,
  useExtractStoreId,
}
