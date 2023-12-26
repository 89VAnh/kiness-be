import { Router } from "express";
import { container } from "tsyringe";
import { DashboardController } from "../controllers/dashboardCotroller";
import { authenticate } from "../middlewares/authMiddleware";

const dashboardRouter = Router();

const dashboardController = container.resolve(DashboardController);

dashboardRouter.get(
  "/count-experience-register",
  authenticate,
  dashboardController.countExperienceRegister.bind(dashboardController),
);

dashboardRouter.get(
  "/count-employee",
  authenticate,
  dashboardController.countEmployee.bind(dashboardController),
);

dashboardRouter.get(
  "/count-branch",
  authenticate,
  dashboardController.countBranch.bind(dashboardController),
);

dashboardRouter.get(
  "/count-request",
  authenticate,
  dashboardController.countRequest.bind(dashboardController),
);

dashboardRouter.get(
  "/statistic-experience",
  dashboardController.statisticExperience.bind(dashboardController),
);

export default dashboardRouter;
