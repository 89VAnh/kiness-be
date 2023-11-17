import { Router } from "express";
import { container } from "tsyringe";
import { BranchRegisterController } from "../controllers/branchRegisterController";
import { authenticate } from "../middlewares/authMiddleware";

const branchRegisterRouter = Router();
const branchRegisterController = container.resolve(BranchRegisterController);

branchRegisterRouter.post(
  "/create",
  branchRegisterController.createBranchRegister.bind(branchRegisterController),
);

// branchRegisterRouter.post(
//   "/update-status",
//   branchRegisterController.updateBranchRegisterStatus.bind(branchRegisterController),
// );

branchRegisterRouter.post(
  "/search",
  authenticate,
  branchRegisterController.searchBranchRegister.bind(branchRegisterController),
);

branchRegisterRouter.delete(
  "/delete",
  authenticate,
  branchRegisterController.deleteBranchRegister.bind(branchRegisterController),
);

// branchRegisterRouter.post(
//   "/print",
//   authenticate,
//   branchRegisterController.printBranchRegister.bind(branchRegisterController),
// );
export default branchRegisterRouter;
