import { Router } from "express";
import { container } from "tsyringe";

import { RolePermissionController } from "../controllers/rolePermissionController";
import { authenticate } from "../middlewares/authMiddleware";

const permissionRouter = Router();
const perController = container.resolve(RolePermissionController);
permissionRouter.post(
  "/create",
  authenticate,
  perController.createRolePermission.bind(perController),
);
permissionRouter.post(
  "/delete",
  authenticate,
  perController.deleteRolePermission.bind(perController),
);
permissionRouter.get(
  "/get/:roleid/:functionid",
  perController.getRolePermission.bind(perController),
);
export default permissionRouter;
