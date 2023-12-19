import { Router } from 'express';
import { container } from 'tsyringe';
import { UserRoleController } from '../controllers/userRoleController';
import { authenticate } from '../middlewares/authMiddleware';

const userRoleRouter = Router();
const urController = container.resolve(UserRoleController);

userRoleRouter.post(
    '/create', 
    authenticate,
    urController.createUserRole.bind(urController)
);
userRoleRouter.post(
    '/delete', 
    authenticate,
    urController.deleteUserRole.bind(urController)
);
userRoleRouter.get(
    '/get/:roleid/:userid', 
    urController.getUserRole.bind(urController)
);
export default userRoleRouter;