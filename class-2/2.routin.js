const http = require('node:http')

// comonJS -> modulos clasicos de node
const dittoJSON = require('./pokemon/ditto.json')

const processRequet = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Conten-Type', 'application/json; chaset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/hml; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':
          const body = ''
      }
  }
}

const server = http.createServer(processRequet)

server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234')
})
