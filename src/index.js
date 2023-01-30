const http = require('http')

const { routes } = require('./routes')
const { getCurrentRoute } = require('./helpers/getCurrentRoute')

const server = http.createServer((req, res) => {
  const { isRouteExists, route } = getCurrentRoute(req.method, req.url)
  
  if (isRouteExists) {
    route.runController(req, res)
  }
})

server.listen(3000, () => console.log('Server has been started at http://localhost:3000'))