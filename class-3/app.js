const express = require('express')
const movies = require('./movies.json')

const app = express()
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

  res.json({ message: 'Hola mundo' })
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

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on PORT http://localhost:${PORT}`)
})
