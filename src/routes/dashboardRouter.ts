import { Router } from "express";
import { container } from "tsyringe";
import { DashboardController } from "../controllers/dashboardCotroller";
import { authenticate } from "../middlewares/authMiddleware";

const dashboardRouter = Router();

const dashboardController = container.resolve(DashboardController);

dashboardRouter.get(
  "/count-customer",
  authenticate,
  dashboardController.countCustomer.bind(dashboardController),
);

dashboardRouter.get(
  "/count-experience-register",
  authenticate,
  dashboardController.countExperienceRegister.bind(dashboardController),
);

dashboardRouter.get(
  "/count-test-register",
  authenticate,
  dashboardController.countTestRegister.bind(dashboardController),
);

dashboardRouter.get(
  "/count-branch-register",
  authenticate,
  dashboardController.countBranchRegister.bind(dashboardController),
);

dashboardRouter.get(
  "/count-employee",
  authenticate,
  dashboardController.countEmployee.bind(dashboardController),
);

dashboardRouter.get(
  "/count-news",
  authenticate,
  dashboardController.countNews.bind(dashboardController),
);

dashboardRouter.get(
  "/count-branch",
  authenticate,
  dashboardController.countBranch.bind(dashboardController),
);

export default dashboardRouter;
