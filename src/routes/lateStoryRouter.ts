import { Router } from "express";
import { container } from "tsyringe";
import { LateStoryController } from "../controllers/lateStoryController";
import { authenticate } from "../middlewares/authMiddleware";

const lateStoryRouter = Router();
const lateStoryController = container.resolve(LateStoryController);

lateStoryRouter.post(
    "/create",
    authenticate,
    lateStoryController.createLateStory.bind(lateStoryController)
);

lateStoryRouter.post(
    "/update",
    authenticate,
    lateStoryController.updateLateStory.bind(lateStoryController)
);

lateStoryRouter.delete(
    "/delete/:id",
    authenticate,
    lateStoryController.deleteLateStory.bind(lateStoryController)
);

lateStoryRouter.get(
    "/get-detail/:id",
    authenticate,
    lateStoryController.getDetailLateStory.bind(lateStoryController)
);

lateStoryRouter.get(
    "/get-detail-client/:id",
    lateStoryController.getDetailClientLateStory.bind(lateStoryController)
);

lateStoryRouter.post(
    "/search",
    authenticate,
    lateStoryController.searchLateStories.bind(lateStoryController)
);

lateStoryRouter.post(
    "/search-client",
    lateStoryController.searchClientLateStories.bind(lateStoryController)
);


export default lateStoryRouter;