import { Router } from "express";
import { container } from "tsyringe";
import { PositionController } from "../controllers/positionController";
import { authenticate } from "../middlewares/authMiddleware";

const positionRouter = Router();
const positionController = container.resolve(PositionController);
positionRouter.get(
  "/get-by-id/:id",
  positionController.getPositionById.bind(positionController),
);
positionRouter.get(
  "/dropdown",
  positionController.getPositionDropdown.bind(positionController),
);
positionRouter.post(
  "/create",
  authenticate,
  positionController.createPosition.bind(positionController),
);
positionRouter.post(
  "/update",
  authenticate,
  positionController.updatePosition.bind(positionController),
);
positionRouter.post(
  "/delete",
  authenticate,
  positionController.deletePosition.bind(positionController),
);
positionRouter.post(
  "/search",
  positionController.searchPosition.bind(positionController),
);

export default positionRouter;
