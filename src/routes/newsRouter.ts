import { Router } from "express";
import { container } from "tsyringe";
import { NewsController } from "../controllers/newsController";

const newsRouter = Router();
const newsController = container.resolve(NewsController);

newsRouter.get("/", newsController.getNews.bind(newsController))

export default newsRouter;
