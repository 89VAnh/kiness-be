import { Router } from "express";
import { container } from "tsyringe";
import { BranchController } from "../controllers/branchController";

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
  branchController.createBranch.bind(branchController),
);
branchRouter.post(
  "/update",
  branchController.updateBranch.bind(branchController),
);
branchRouter.post(
  "/delete",
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
