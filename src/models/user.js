const { readDbFile } = require('../helpers/read-db-file.js')

exports.User = class {
  constructor(name) {
    this.id = null
    this.name = name
  }

  saveNewUser(callback) {
    const { writeDbFile } = readDbFile(usersData => {
      this.id = usersData[usersData.length - 1].id + 1
      usersData.push(this)
      
      writeDbFile(usersData, () => callback(JSON.stringify(this)))
    }, true, () => {
      this.id = 1
      writeDbFile([this], (firstInstanceOfUsersData) => 
        callback(firstInstanceOfUsersData)
      )
    })
  }

  static fetchAllUsers(callback) {
    readDbFile(usersAsJson => callback(usersAsJson))
  }

  static fetchUserById(id, callback) {
    readDbFile((parsedUsers) => {
      const existingUser = parsedUsers.find(user => user.id === id)
      
      if (existingUser) return callback(JSON.stringify(existingUser))
    }, true)
  }
  
  static updateUser(data, callback) {
    const { id, name } = data
    
    const { writeDbFile } = readDbFile(parsedUsers => {
      const usersDataWithThisOneUpdated = parsedUsers.map(user => (
        user.id === id
          ? {
            ...user,
            name
          } : user
      ))
      
      writeDbFile(usersDataWithThisOneUpdated, () => null)
    }, true)
  }
  
  static removeUser(id) {
    const { writeDbFile, removeDbFile } = readDbFile((parsedUsers) => {
      const usersDataWithThisOneDeleted = parsedUsers.filter(user => (
        user.id !== id
      ))
      const hasNoMoreUserRecordInDbFile = usersDataWithThisOneDeleted.length < 1
      
      if (hasNoMoreUserRecordInDbFile) {
        removeDbFile()
        return
      }
      
      writeDbFile(usersDataWithThisOneDeleted, () => null)
    }, true)
  }
}
