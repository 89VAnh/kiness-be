import { Router } from "express";
import { container } from "tsyringe";
import { RoleController } from "../controllers/roleController";
import { authenticate } from "../middlewares/authMiddleware";

const roleRouter = Router();
const roleController = container.resolve(RoleController);
roleRouter.get(
  "/get-by-id/:id",
  roleController.getRoleById.bind(roleController),
);
roleRouter.get(
  "/dropdown",
  roleController.getRoleDropdown.bind(roleController),
);
roleRouter.post(
  "/create",
  authenticate,
  roleController.createRole.bind(roleController),
);
roleRouter.post(
  "/update",
  authenticate,
  roleController.updateRole.bind(roleController),
);
roleRouter.delete(
  "/delete",
  authenticate,
  roleController.deleteRole.bind(roleController),
);
roleRouter.post("/search", roleController.searchRole.bind(roleController));
export default roleRouter;
