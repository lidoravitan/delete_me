const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('Post', Post)
