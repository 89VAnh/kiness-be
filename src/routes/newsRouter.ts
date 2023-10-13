import { Router } from "express";
import { container } from "tsyringe";
import { NewsController } from "../controllers/newsController";

const newsRouter = Router();
const newsController = container.resolve(NewsController);

newsRouter.post("/search", newsController.searchNews.bind(newsController))
newsRouter.post("/create", newsController.createNews.bind(newsController))
newsRouter.post("/update", newsController.updateNews.bind(newsController))
newsRouter.post("/delete", newsController.deleteNews.bind(newsController))
newsRouter.get("/get-by-id/:id", newsController.getNewsById.bind(newsController))

export default newsRouter;
