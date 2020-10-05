const uuid = require('uuid')

const isDev = () => process.env.NODE_ENV === 'DEV'

exports.DB_HOST_URI = `mongodb://${isDev() ? 'localhost' : 'db'}:27017/FEED`

exports.PORT = isDev() ? 3000 : 80

exports.SECRET_KEY = 'DEV' || `APP_SECRET_${uuid()}`
