import express from 'express'
import ProductoAgricolaController from '../controllers/ProductoAgricolaController.js'
const ProductoAgricolaRouter = express.Router()

ProductoAgricolaRouter.get('/', ProductoAgricolaController.findAll)
ProductoAgricolaRouter.get('/:id', ProductoAgricolaController.findOne)
ProductoAgricolaRouter.post('/', ProductoAgricolaController.create)
ProductoAgricolaRouter.patch('/:id', ProductoAgricolaController.update)
ProductoAgricolaRouter.delete('/:id', ProductoAgricolaController.destroy)

export default ProductoAgricolaRouter
