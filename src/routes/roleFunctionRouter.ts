import { Router } from 'express';
import { container } from 'tsyringe';
import { RoleFunctionController } from '../controllers/roleFunctionController';
import { authenticate } from '../middlewares/authMiddleware';

const roleFunctionRouter = Router();
const rfController = container.resolve(RoleFunctionController);

roleFunctionRouter.post(
    '/create', 
    authenticate,
    rfController.createRoleFunction.bind(rfController)
    );
roleFunctionRouter.post(
    '/delete', 
    authenticate,
    rfController.deleteRoleFunction.bind(rfController));
export default roleFunctionRouter;