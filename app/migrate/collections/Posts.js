const Model = require('../../models/Post')

exports.Posts = {
  createPosts: ({ author }) => {
    const data = [1, 2, 3].map((number) => ({
      content: `[${number}] hello world :)!`,
      author: author,
    }))

    return Promise.all(
      data.map((entity) => new Model(entity)).map((instance) => instance.save())
    )
  },
}
