const Model = require('../../models/Comment')

exports.Comments = {
  createComments: ({ author, author2, post }) => {
    const data = [1, 2, 3, 4, 5, 6].map((number) => ({
      content: `[${number}] comment`,
      author: number % 2 ? author : author2,
      post,
    }))

    return Promise.all(
      data.map((entity) => new Model(entity)).map((instance) => instance.save())
    )
  },
}
