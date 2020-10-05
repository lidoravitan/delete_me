const mongoose = require('mongoose')
const { DB_HOST_URI } = require('./conf')

exports.dbConnect = async () => {
  console.log('[MongoDB] Conecting...')
  await mongoose
    .connect(DB_HOST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log('[MongoDB] Conected!')
      console.log(`[MongoDB] URI: ${DB_HOST_URI}`)
    })
    .catch(() => {
      console.log('[MongoDB] Conection Fail!')
    })
}
