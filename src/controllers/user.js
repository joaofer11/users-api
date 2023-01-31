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
  },
  postUser(req, res) {
    let body = '';

    req.on('data', chunk => body += chunk)
    
    req.on('end', () => {
      const { name } = JSON.parse(body)
      const user = new User(name)
      user.saveNewUser(createdUser => {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(createdUser))
      })
    })
  }
}
