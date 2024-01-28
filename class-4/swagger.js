import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

// Metadata info about our API
const options= {
    definition:{
      opneapi:'3.0.0',
      info:{title:'Movie API',
            version: '1.0.0'},
    },
    apis:['routes/movies.js', 'movies.json']
 }

// Docs on JSON format
const swaggerSpecs = swaggerJSDoc(options)

export const swaggerDocs = (app, port) =>{
    app.use('/api-docs' , swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
    app.use('/api-docs.json', (req, res) =>{
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpecs)
    })
}
 


// module.exports = {swaggerDocs}