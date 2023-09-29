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
        case '/pokemon': {
          let body = ''

          req.on('data', chunk => {
            body += chunk.toString()
            // console.log(chunk)
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            data.timestamp = Date.now()
            res.writeHead(201, { ContentType: 'aplication/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
        }

        // default:
        //   res.statusCode = 404
        //   res.setHeader('Conten-Type', 'text/plain; charset=utf-8')
        //   return res.end('<h1>404</h1>')
      }
  }
}

const server = http.createServer(processRequet)

server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234')
})
