const http = require('http')

const server = http.createServer((req, res) => {
  res.end('<h1>Testando...</h1>')
})

server.listen(3000, () => console.log('Server has been started at http://localhost:3000'))