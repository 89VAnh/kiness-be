import { Router } from "express";
import { container } from "tsyringe";
import { GrowthArticleController } from "../controllers/growthArticleController";
import { authenticate } from "../middlewares/authMiddleware";

const growthArticleRouter = Router();
const growthArticleController = container.resolve(GrowthArticleController);

growthArticleRouter.post(
  "/create",
  authenticate,
  growthArticleController.createGrowthArticle.bind(growthArticleController),
);

growthArticleRouter.post(
  "/update",
  authenticate,
  growthArticleController.updateGrowthArticle.bind(growthArticleController),
);

growthArticleRouter.patch(
  "/update-view-count/:id",
  growthArticleController.updateViewCountGrowthArticle.bind(
    growthArticleController,
  ),
);

growthArticleRouter.delete(
  "/delete/:id",
  authenticate,
  growthArticleController.deleteGrowthArticle.bind(growthArticleController),
);

growthArticleRouter.get(
  "/get-detail/:id",
  authenticate,
  growthArticleController.getDetailGrowthArticle.bind(growthArticleController),
);

growthArticleRouter.get(
  "/get-detail-client/:id",
  growthArticleController.getDetailClientGrowthArticle.bind(
    growthArticleController,
  ),
);

growthArticleRouter.post(
  "/search",
  authenticate,
  growthArticleController.searchGrowthArticles.bind(growthArticleController),
);

growthArticleRouter.post(
  "/search-client",
  growthArticleController.searchClientGrowthArticles.bind(
    growthArticleController,
  ),
);

export default growthArticleRouter;
