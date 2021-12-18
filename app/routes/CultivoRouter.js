import express from 'express'
import CultivoController from '../controllers/CultivoController.js'
const CultivoRouter = express.Router()

CultivoRouter.get('/', CultivoController.findAll)
CultivoRouter.get('/:id', CultivoController.findOne)
CultivoRouter.post('/', CultivoController.create)
CultivoRouter.patch('/:id', CultivoController.update)
CultivoRouter.delete('/:id', CultivoController.destroy)

export default CultivoRouter
