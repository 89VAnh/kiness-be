import { Router } from "express";
import { container } from "tsyringe";
import { HistoryController } from "../controllers/historyController";
import { authenticate } from "../middlewares/authMiddleware";

const historyRouter = Router();
const historyController = container.resolve(HistoryController);

historyRouter.post(
  "/create",
  authenticate,
  historyController.createHistory.bind(historyController),
);

historyRouter.post(
  "/update",
  authenticate,
  historyController.updateHistory.bind(historyController),
);

historyRouter.post(
  "/delete",
  authenticate,
  historyController.deleteHistory.bind(historyController),
);

historyRouter.get(
  "/get-detail/:id",
  authenticate,
  historyController.getHistory.bind(historyController),
);

historyRouter.post(
  "/search",
  historyController.searchHistories.bind(historyController),
);

export default historyRouter;
