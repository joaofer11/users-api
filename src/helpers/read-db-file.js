const fs = require('fs')
const path = require('path')

exports.readDbFile = (succCb, isParsedUsers = false, errCb) => {
  const dbPath = path.join(__dirname, '..', 'data', 'users.json')
  
  fs.readFile(
    dbPath,
    (err, fileContent) => {
      if (!err) {
        succCb(isParsedUsers ? JSON.parse(fileContent) : fileContent)
        return
      }
      
      if (errCb) errCb(err)
    }
  )
  
  return {
    writeDbFile: (usersData, callback) => {
      const usersDataAsJson = JSON.stringify(usersData)
      
      fs.writeFile(
        dbPath,
        usersDataAsJson,
        err => callback(usersDataAsJson)
      )
    },
    removeDbFile: () => {
      fs.unlink(
        dbPath,
        err => err
      )
    }
  }
}