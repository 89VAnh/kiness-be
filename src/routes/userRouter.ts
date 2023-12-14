import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.post("/login", userController.authenticate.bind(userController));
userRouter.post(
  "/login-employee",
  userController.authenticateEmployee.bind(userController),
);
userRouter.get(
  "/get-by-id/:id",
  authenticate,
  userController.getUserById.bind(userController),
);
userRouter.get("/me", authenticate, userController.isMe.bind(userController));
userRouter.post("/create", userController.createUser.bind(userController));
userRouter.post(
  "/reset-password",
  userController.resetPassword.bind(userController),
);
userRouter.post(
  "/change-password",
  userController.changePassword.bind(userController),
);
userRouter.post(
  "/update",
  authenticate,
  userController.updateUser.bind(userController),
);
userRouter.post(
  "/delete",
  authenticate,
  userController.deleteUser.bind(userController),
);
userRouter.post("/search", userController.searchUser.bind(userController));
export default userRouter;
