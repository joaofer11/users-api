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
        const usersParsedFromJson = JSON.parse(fileContent)
        callback(usersParsedFromJson)
      }
    )
  }
}