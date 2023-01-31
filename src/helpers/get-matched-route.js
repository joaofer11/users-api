const { routes } = require('../routes')

const splitEndpointInArr = (route) => route.split('/').filter(Boolean)

const setParams = ({ req, reqEndpointAsArr, serverEndpointAsArr }) => {
  const filteredPathParams = serverEndpointAsArr
    .reduce((acc, path, index) => (
      path.includes(':')
       ?  {
            ...acc,
            [path.replace(':', '')]: reqEndpointAsArr[index]
          }
       :  acc
    ), {})

  req.pathParams = filteredPathParams
}

exports.getMatchedRoute = (req) => {
  const { method: reqMethod, url: reqEndpoint } = req

  let serverEndpointAsArr = null;
  const reqEndpointAsArr = splitEndpointInArr(reqEndpoint)

  const matchedRoute = routes.find(route => {
    const isAnValidEndpointName = route.endpoint.includes(reqEndpointAsArr[0])
    serverEndpointAsArr = splitEndpointInArr(route.endpoint)
    const hasTheSameEndpointLength = reqEndpointAsArr.length === serverEndpointAsArr.length
    const hasTheSameMethod = reqMethod === route.method

    return isAnValidEndpointName && hasTheSameEndpointLength && hasTheSameMethod
  })

  if (matchedRoute && reqEndpointAsArr.length > 1) {
    setParams({
      req,
      reqEndpointAsArr,
      serverEndpointAsArr,
    })
  }

  return matchedRoute
    ? {
      matchedRoute,
      isRouteExists: true,
    } : {
      matchedRoute: null,
      isRouteExists: false,
    }
}
