import { Router } from 'express'

import { MovieControler } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieControler.getAll)

moviesRouter.get('/:id', MovieControler.getById)

moviesRouter.post('/', MovieControler.create)

moviesRouter.delete('/:id', MovieControler.delete)

moviesRouter.patch('/:id', MovieControler.update)
