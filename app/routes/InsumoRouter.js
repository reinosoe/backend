import express from 'express'
import InsumoController from '../controllers/InsumoController.js'
const InsumoRouter = express.Router()

InsumoRouter.get('/', InsumoController.findAll)
InsumoRouter.get('/:id', InsumoController.findOne)
InsumoRouter.post('/', InsumoController.create)
InsumoRouter.patch('/:id', InsumoController.update)
InsumoRouter.delete('/:id', InsumoController.destroy)

export default InsumoRouter
