import { Router } from "express";
import { container } from "tsyringe";
import { PostureStoryController } from "../controllers/postureStoryController";
import { authenticate } from "../middlewares/authMiddleware";

const postureStoryRouter = Router();
const postureStoryController = container.resolve(PostureStoryController);

postureStoryRouter.post(
  "/create",
  authenticate,
  postureStoryController.createPostureStory.bind(postureStoryController),
);

postureStoryRouter.post(
  "/update",
  authenticate,
  postureStoryController.updatePostureStory.bind(postureStoryController),
);

postureStoryRouter.patch(
  "/update-view-count/:id",
  postureStoryController.updateViewCountPostureStory.bind(
    postureStoryController,
  ),
);

postureStoryRouter.delete(
  "/delete/:id",
  authenticate,
  postureStoryController.deletePostureStory.bind(postureStoryController),
);

postureStoryRouter.get(
  "/get-detail/:id",
  authenticate,
  postureStoryController.getDetailPostureStory.bind(postureStoryController),
);

postureStoryRouter.get(
  "/get-detail-client/:id",
  postureStoryController.getDetailClientPostureStory.bind(
    postureStoryController,
  ),
);

postureStoryRouter.post(
  "/search",
  authenticate,
  postureStoryController.searchPostureStories.bind(postureStoryController),
);

postureStoryRouter.post(
  "/search-client",
  postureStoryController.searchClientPostureStories.bind(
    postureStoryController,
  ),
);

export default postureStoryRouter;
