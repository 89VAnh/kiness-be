import { Router } from "express";
import { container } from "tsyringe";
import { DiagramController } from "../controllers/diagramController";
import { authenticate } from "../middlewares/authMiddleware";

const diagramRouter = Router();
const diagramController = container.resolve(DiagramController);
diagramRouter.get(
  "/getbyid/:id",
  diagramController.getNodeById.bind(diagramController),
);
diagramRouter.post(
  "/create",
  authenticate,
  diagramController.createNode.bind(diagramController),
);
diagramRouter.post(
  "/update",
  authenticate,
  diagramController.updateNode.bind(diagramController),
);
diagramRouter.post(
  "/delete",
  authenticate,
  diagramController.deleteNode.bind(diagramController),
);
diagramRouter.post(
  "/search",
  diagramController.searchNodes.bind(diagramController),
);
export default diagramRouter;
