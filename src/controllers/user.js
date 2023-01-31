const { User } = require('../models/user')

exports.userController = {
  getUsers(req, res) {
    User.fetchAllUsers(usersResource => res.end(usersResource))
  },
  getUserById(req, res) {
    const { id } = req.pathParams || {}

    User.fetchUserById(Number(id), userResource => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(userResource)
    })
  }
}
