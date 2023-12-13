import { Router } from "express";
import { container } from "tsyringe";
import { ArticleAuthorController } from "../controllers/articleAuthorController";
import { authenticate } from "../middlewares/authMiddleware";

const articleAuthorRouter = Router();
const articleAuthorController = container.resolve(ArticleAuthorController);
articleAuthorRouter.get(
  "/get-by-id/:id",
  articleAuthorController.getArticleAuthorById.bind(articleAuthorController),
);
articleAuthorRouter.post(
  "/create",
  authenticate,
  articleAuthorController.createArticleAuthor.bind(articleAuthorController),
);
articleAuthorRouter.post(
  "/update",
  authenticate,
  articleAuthorController.updateArticleAuthor.bind(articleAuthorController),
);
articleAuthorRouter.post(
  "/delete",
  authenticate,
  articleAuthorController.deleteArticleAuthor.bind(articleAuthorController),
);
articleAuthorRouter.post(
  "/search",
  articleAuthorController.searchArticleAuthor.bind(articleAuthorController),
);

articleAuthorRouter.get(
  "/get-dropdown",
  articleAuthorController.getArticleAuthorDropdown.bind(
    articleAuthorController,
  ),
);

export default articleAuthorRouter;
