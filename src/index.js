const http = require('http')

const { routes } = require('./routes')
const { parseBody } = require('./helpers/parse-body')
const { getMatchedRoute } = require('./helpers/get-matched-route')
const { injectSendHelper } = require('./helpers/inject-send-helper')

const server = http.createServer((req, res) => {
  const { isRouteExists, matchedRoute } = getMatchedRoute(req)
  
  injectSendHelper(res)
  
  if (!isRouteExists) {
    res.send(404, `Cannot ${req.method} at ${req.url}`, 'text/html')
    return
  }
  
  if (['POST', 'PUT'].includes(req.method)) {
    parseBody(req, () => matchedRoute.runController(req, res))
    return
  }
  
  matchedRoute.runController(req, res)
})

server.listen(3000, () => console.log('Server has been started at http://localhost:3000'))