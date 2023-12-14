import { Router } from "express";
import { container } from "tsyringe";
import { ObesityStoryController } from "../controllers/obesityStoryController";
import { authenticate } from "../middlewares/authMiddleware";

const obesityStoryRouter = Router();
const obesityStoryController = container.resolve(ObesityStoryController);

obesityStoryRouter.post(
  "/create",
  authenticate,
  obesityStoryController.createObesityStory.bind(obesityStoryController),
);

obesityStoryRouter.post(
  "/update",
  authenticate,
  obesityStoryController.updateObesityStory.bind(obesityStoryController),
);

obesityStoryRouter.patch(
  "/update-view-count/:id",
  obesityStoryController.updateViewCountObesityStory.bind(
    obesityStoryController,
  ),
);

obesityStoryRouter.delete(
  "/delete/:id",
  authenticate,
  obesityStoryController.deleteObesityStory.bind(obesityStoryController),
);

obesityStoryRouter.get(
  "/get-detail/:id",
  authenticate,
  obesityStoryController.getDetailObesityStory.bind(obesityStoryController),
);

obesityStoryRouter.get(
  "/get-detail-client/:id",
  obesityStoryController.getDetailClientObesityStory.bind(
    obesityStoryController,
  ),
);

obesityStoryRouter.post(
  "/search",
  authenticate,
  obesityStoryController.searchObesityStories.bind(obesityStoryController),
);

obesityStoryRouter.post(
  "/search-client",
  obesityStoryController.searchClientObesityStories.bind(
    obesityStoryController,
  ),
);

export default obesityStoryRouter;
