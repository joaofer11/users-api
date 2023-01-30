const { routes } = require('../routes')

exports.getCurrentRoute = (method, endpoint) => {
  const existingRoute = routes.find(route => (
    route.method === method && route.endpoint === endpoint
  ))
  
  console.log(existingRoute)
  
  return existingRoute
    ? {
      isRouteExists: true,
      route: existingRoute,
    } : {
      isRouteExists: false,
      route: existingRoute,
    }
}