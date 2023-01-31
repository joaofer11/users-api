const fs = require('fs')
const path = require('path')

exports.User = class {
  constructor(name) {
    this.id = null
    this.name = name
  }

  saveNewUser(callback) {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'users.json'),
      (err, fileContent) => {
        if (!err) {
          const parsedUsers = JSON.parse(fileContent)
          this.id = parsedUsers[parsedUsers.length - 1].id + 1
          parsedUsers.push(this)
          
          fs.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'), 
            JSON.stringify(parsedUsers), 
            err => callback(this)
          )
          return
        }
        
        this.id = 1
        const firstInstanceOfData = JSON.stringify([this])
        
        fs.writeFile(
          path.join(__dirname, '..', 'data', 'users.json'), 
          firstInstanceOfData, 
          err => callback(this)
        )
      }
    )
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
  
  static removeUser(id) {
    fs.readFile(
      path.join(__dirname, '..', 'data', 'users.json'),
      (err, fileContent) => {
        if (!err) {
          const parsedUsers = JSON.parse(fileContent)
          const updatedUsers = parsedUsers.filter(user => user.id !== id)
          
          fs.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(updatedUsers),
            err => err
          )
        }
      }
    )
  }
}
