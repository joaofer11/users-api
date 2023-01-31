const fs = require('fs')
const path = require('path')

exports.User = class {
  constructor(name) {
    this.id = null
    this.name = name
  }

  static fetchAllUsers(callback) {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'users.json'),
      (err, fileContent) => {
        callback(fileContent)
      }
    )
  }

  static fetchUserById(id, callback) {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'users.json'),
      (err, fileContent) => {
        const parsedUsers = JSON.parse(fileContent)
        const existingUser = parsedUsers.find(user => user.id === id)

        if (existingUser) return callback(JSON.stringify(existingUser))

        callback(JSON.stringify({ err: 'User not found' }))
    })
  }
}
