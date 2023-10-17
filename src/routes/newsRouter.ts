import { Router } from "express";
import { container } from "tsyringe";
import { NewsController } from "../controllers/newsController";
import { authenticate } from "../middlewares/authMiddleware";

const newsRouter = Router();
const newsController = container.resolve(NewsController);

newsRouter.post("/search", newsController.searchNews.bind(newsController))
newsRouter.post("/create", authenticate, newsController.createNews.bind(newsController))
newsRouter.post("/update", authenticate, newsController.updateNews.bind(newsController))
newsRouter.post("/delete", authenticate, newsController.deleteNews.bind(newsController))
newsRouter.get("/get-by-id/:id", newsController.getNewsById.bind(newsController))

export default newsRouter;
