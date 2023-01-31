const { userController } = require('./controllers/user')

exports.routes = [
  {
    method: 'GET',
    endpoint: '/users',
    runController: userController.getUsers,
  },
  {
    method: 'GET',
    endpoint: '/users/:id',
    runController: userController.getUserById,
  },
  {
    method: 'POST',
    endpoint: '/users',
    runController: userController.postUser,
  },
  {
    method: 'PUT',
    endpoint: '/users',
    runController: null,
  },
  {
    method: 'DELETE',
    endpoint: '/users/:id',
    runController: userController.deleteUser,
  },
]
