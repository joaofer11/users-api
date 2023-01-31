const http = require('http')

const { routes } = require('./routes')
const { getMatchedRoute } = require('./helpers/get-matched-route')

const server = http.createServer((req, res) => {
  const { isRouteExists, matchedRoute } = getMatchedRoute(req)
  
  if (isRouteExists) {
    matchedRoute.runController(req, res)
  }
})

server.listen(3000, () => console.log('Server has been started at http://localhost:3000'))