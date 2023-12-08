import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from "../middlewares/authMiddleware";
import { RequestController } from "../controllers/requestController";

const requestRouter = Router();
const requestController = container.resolve(RequestController);

requestRouter.post(
    '/create',
    authenticate,
    requestController.createRequest.bind(requestController)
);

requestRouter.post(
    '/update',
    authenticate,
    requestController.updateRequest.bind(requestController)
);

requestRouter.delete(
    '/delete/:id',
    authenticate,
    requestController.deleteRequest.bind(requestController)
);

requestRouter.get(
    '/get-detail/:id',
    authenticate,
    requestController.getRequest.bind(requestController)
);

requestRouter.post(
    '/get-client-read-detail',
    requestController.getClientReadRequest.bind(requestController)
);

requestRouter.post(
    '/search',
    authenticate,
    requestController.searchRequests.bind(requestController)
);

requestRouter.post(
    '/search-client',
    requestController.searchClientRequests.bind(requestController)
);

export default requestRouter;