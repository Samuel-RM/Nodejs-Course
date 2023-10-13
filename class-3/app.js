const express = require('express')
const crypto = require('node:crypto')

const movies = require('./movies.json')
const { validateMovie } = require('./Schemas/movies')

const app = express()
app.use(express.json())
app.disable('x-powered-by') // Disabale the header 'X-poweered-by: Expreess'

app.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterMovies = movies.filter(
      movie => movies.genre.some(g => g.toLowercase() === genre.toLowercase())
    )
    return res.join(filterMovies)
  }
  res.json(movies)
})

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regrexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not faund' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  // Because of " movies.push(newMovie)"  this is not a REST, because where saving
  // the state of the aplication in memory

  // Remenber a REST API should not save any data in memory
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on PORT http://localhost:${PORT}`)
})
