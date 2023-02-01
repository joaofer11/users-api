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
    const { name } = req.body
    const user = new User(name)
    
    user.saveNewUser(createdUser => {
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(createdUser))
    })
  },
  putUser(req, res) {
    const { name } = req.body
    const { id } = req.pathParams
    
    User.updateUser({ id: Number(id), name }, () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ id, name }))
    })
  },
  deleteUser(req, res) {
    const { id } = req.pathParams
    
    User.removeUser(Number(id))
    
    res.writeHead(202, {})
    res.end()
  }
}
