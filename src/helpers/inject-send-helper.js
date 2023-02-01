exports.injectSendHelper = res => {
  res.send = (statusCode, body, contentType = 'application/json') => {
    res.writeHead(statusCode, { 'Content-Type': contentType })
    res.end(body)
  }
}