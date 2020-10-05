const mongoose = require('mongoose')

const { Users } = require('./collections/Users')
const { Posts } = require('./collections/Posts')
const { Comments } = require('./collections/Comments')

async function migrate() {
  console.log('[MIGRATE] Start Migration')
  await mongoose.connection.db.dropDatabase()

  const [user, user2] = await Users.createUsers()
  const [post] = await Posts.createPosts({ author: user._id })
  await Comments.createComments({ author: user._id, author2: user2._id, post })

  console.log('[MIGRATE] Done')
}

module.exports = async (req, res) => {
  await migrate()
  res.json({ message: 'done' })
}
