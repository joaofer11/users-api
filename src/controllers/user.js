const { User } = require('../models/user')

exports.userController = {
  getUsers(req, res) {
    User.fetchAllUsers(usersResource => res.end(usersResource))
  }
}