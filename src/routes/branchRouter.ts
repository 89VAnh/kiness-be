import { Router } from "express";
import { container } from "tsyringe";
import { BranchController } from "../controllers/branchController";
import { authenticate } from "../middlewares/authMiddleware";

const branchRouter = Router();
const branchController = container.resolve(BranchController);
branchRouter.get(
  "/get-by-id/:id",
  branchController.getBranchById.bind(branchController),
);
branchRouter.get(
  "/dropdown",
  branchController.getBranchDropdown.bind(branchController),
);
branchRouter.post(
  "/create",
  authenticate,
  branchController.createBranch.bind(branchController),
);
branchRouter.post(
  "/update",
  authenticate,
  branchController.updateBranch.bind(branchController),
);
branchRouter.post(
  "/delete",
  authenticate,
  branchController.deleteBranch.bind(branchController),
);
branchRouter.post(
  "/search",
  branchController.searchBranch.bind(branchController),
);
branchRouter.post(
  "/create-test-register",
  branchController.createTestRegister.bind(branchController),
);
export default branchRouter;
