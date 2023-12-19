import { Router } from 'express';
import { container } from 'tsyringe';
import { ActionController } from '../controllers/actionController';
import { authenticate } from '../middlewares/authMiddleware';

const actionRouter = Router();
const actionController = container.resolve(ActionController);
actionRouter.get(
    '/getbyid/:id', 
    authenticate,
    actionController.getActionById.bind(actionController)
    );
actionRouter.post(
    '/create',
    authenticate, 
    actionController.createAction.bind(actionController)
    );
actionRouter.post(
    '/update',
    authenticate, 
    actionController.updateAction.bind(actionController)
    );
actionRouter.post(
    '/delete',
    authenticate, 
    actionController.deleteAction.bind(actionController)
    );
actionRouter.post(
    '/search',
    authenticate, 
    actionController.searchAction.bind(actionController));
export default actionRouter;