import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/userController';

const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.post('/login', userController.authenticate.bind(userController)); 
userRouter.post('/login-employee', userController.authenticateEmployee.bind(userController)); 
userRouter.get('/get-by-id/:id', userController.getUserById.bind(userController));
userRouter.get('/authorize/:token', userController.authorize.bind(userController));
userRouter.post('/create', userController.createUser.bind(userController));
userRouter.post('/update', userController.updateUser.bind(userController));
userRouter.post('/delete', userController.deleteUser.bind(userController));
userRouter.post('/search', userController.searchUser.bind(userController));
export default userRouter;