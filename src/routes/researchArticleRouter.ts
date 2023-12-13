import { Router } from "express";
import { container } from "tsyringe";
import { ResearchArticleController } from "../controllers/researchArticleController";
import { authenticate } from "../middlewares/authMiddleware";

const researchArticleRouter = Router();
const researchArticleController = container.resolve(ResearchArticleController);
researchArticleRouter.get(
  "/get-by-id/:id",
  researchArticleController.getResearchArticleById.bind(
    researchArticleController,
  ),
);
researchArticleRouter.post(
  "/create",
  authenticate,
  researchArticleController.createResearchArticle.bind(
    researchArticleController,
  ),
);
researchArticleRouter.post(
  "/update",
  authenticate,
  researchArticleController.updateResearchArticle.bind(
    researchArticleController,
  ),
);
researchArticleRouter.post(
  "/delete",
  authenticate,
  researchArticleController.deleteResearchArticle.bind(
    researchArticleController,
  ),
);
researchArticleRouter.post(
  "/search",
  researchArticleController.searchResearchArticle.bind(
    researchArticleController,
  ),
);

export default researchArticleRouter;
