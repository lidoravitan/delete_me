const Model = require('../../models/User')

exports.Users = {
  createUsers: () => {
    const user1 = new Model({
      email: 'test@gmail.com',
      password: 'test',
      fullname: 'אבירם תורגמן',
      role: 'user',
    }).save()

    const user2 = new Model({
      email: 'test@gmail.com',
      password: 'test',
      fullname: 'אבירם תורגמן',
      role: 'user',
    }).save()

    return Promise.all([user1, user2])
  },
}
