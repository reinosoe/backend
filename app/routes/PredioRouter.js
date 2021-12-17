import express from 'express';
import PredioController from '../controllers/PredioController.js';
const PredioRouter = express.Router();

PredioRouter.get('/', PredioController.findAll);
PredioRouter.get('/:id', PredioController.findOne);
PredioRouter.post('/', PredioController.create);
PredioRouter.patch('/:id', PredioController.update);
PredioRouter.delete('/:id', PredioController.destroy);

export default PredioRouter;
