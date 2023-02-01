const { User } = require('../models/user')

exports.userController = {
  getUsers(req, res) {
    User.fetchAllUsers(usersResource => res.send(200, usersResource))
  },
  getUserById(req, res) {
    const { id } = req.pathParams || {}
    User.fetchUserById(Number(id), userResource => res.send(200, userResource))
  },
  postUser(req, res) {
    const { name } = req.body
    const user = new User(name)
    
    user.saveNewUser(createdUserResource => {
      res.send(201, createdUserResource)
    })
  },
  putUser(req, res) {
    const userToUpdate = { id: Number(req.pathParams.id), name: req.body.name }
    
    User.updateUser(userToUpdate)
    
    res.send(200, JSON.stringify(userToUpdate))
  },
  deleteUser(req, res) {
    const { id } = req.pathParams
    
    User.removeUser(Number(id))
    
    res.send(202, null, null)
  }
}
