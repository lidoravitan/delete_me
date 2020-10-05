const User = require('../../models/User')

const authenticate = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) return { message: 'Authentication Faild!' }
  const isMatch = await user.comparePassword(password)
  if (!isMatch) return { message: 'Authentication Faild!' }

  return {
    token: user.composeJsonWebToken(),
    store: user.stores && user.stores[0],
    success: true,
  }
}

const withUserAuthentication = async (req, res) => {
  const { email, password } = req.body
  const response = await authenticate({ email, password })
  const status = response.success ? 200 : 400
  return res.status(status).json(response)
}

module.exports = {
  withUserAuthentication,
}
