import { Router } from "express";
import { container } from "tsyringe";
import { GrowthStoryController } from "../controllers/growthStoryController";
import { authenticate } from "../middlewares/authMiddleware";

const growthStoryRouter = Router();
const growthStoryController = container.resolve(GrowthStoryController);

growthStoryRouter.post(
  "/create",
  authenticate,
  growthStoryController.createGrowthStory.bind(growthStoryController),
);

growthStoryRouter.post(
  "/update",
  authenticate,
  growthStoryController.updateGrowthStory.bind(growthStoryController),
);

growthStoryRouter.patch(
  "/update-view-count/:id",
  growthStoryController.updateViewCountGrowthStory.bind(growthStoryController),
);

growthStoryRouter.delete(
  "/delete/:id",
  authenticate,
  growthStoryController.deleteGrowthStory.bind(growthStoryController),
);

growthStoryRouter.get(
  "/get-detail/:id",
  authenticate,
  growthStoryController.getDetailGrowthStory.bind(growthStoryController),
);

growthStoryRouter.get(
  "/get-detail-client/:id",
  growthStoryController.getDetailClientGrowthStory.bind(growthStoryController),
);

growthStoryRouter.post(
  "/search",
  authenticate,
  growthStoryController.searchGrowthStories.bind(growthStoryController),
);

growthStoryRouter.post(
  "/search-client",
  growthStoryController.searchClientGrowthStories.bind(growthStoryController),
);

export default growthStoryRouter;
