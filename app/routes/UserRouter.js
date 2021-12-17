import express from 'express';
import UserController from '../controllers/UserController.js';
const UserRouter = express.Router();

UserRouter.get('/', UserController.findAll);
UserRouter.get('/:id', UserController.findOne);
UserRouter.post('/', UserController.create);
UserRouter.patch('/:id', UserController.update);
UserRouter.delete('/:id', UserController.destroy);

export default UserRouter;
