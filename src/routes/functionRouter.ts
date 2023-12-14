import { Router } from "express";
import { container } from "tsyringe";
import { FunctionController } from "../controllers/functionController";
import { authenticate } from "../middlewares/authMiddleware";

const funcRouter = Router();
const funcController = container.resolve(FunctionController);
funcRouter.get(
  "/getbyid/:id",
  funcController.getFunctionById.bind(funcController),
);
funcRouter.get(
  "/getbyrole/:id",
  authenticate,
  funcController.getByRole.bind(funcController),
);
funcRouter.post(
  "/create",
  authenticate,
  funcController.createFUnction.bind(funcController),
);
funcRouter.post(
  "/update",
  authenticate,
  funcController.updateFunction.bind(funcController),
);
funcRouter.post(
  "/delete",
  authenticate,
  funcController.deleteFunction.bind(funcController),
);
funcRouter.post(
  "/search",
  authenticate,
  funcController.searchFunction.bind(funcController),
);
export default funcRouter;
