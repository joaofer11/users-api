const http = require('http')

const { routes } = require('./routes')
const { parseBody } = require('./helpers/parse-body')
const { getMatchedRoute } = require('./helpers/get-matched-route')

const server = http.createServer((req, res) => {
  const { isRouteExists, matchedRoute } = getMatchedRoute(req)
  
  if (isRouteExists) {
    if (['POST', 'PUT'].includes(req.method)) {
      parseBody(req, () => matchedRoute.runController(req, res))
      return
    }
    matchedRoute.runController(req, res)
  }
  
  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.end(`Cannot ${req.method} at ${req.url}`)
})

server.listen(3000, () => console.log('Server has been started at http://localhost:3000'))