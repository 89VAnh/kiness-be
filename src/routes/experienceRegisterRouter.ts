import { Router } from "express";
import { container } from "tsyringe";
import { ExperienceRegisterController } from "../controllers/experienceRegisterController";
import { authenticate } from "../middlewares/authMiddleware";

const experienceRegisterRouter = Router();
const experienceRegisterController = container.resolve(
  ExperienceRegisterController,
);

experienceRegisterRouter.post(
  "/create",
  experienceRegisterController.createExperienceRegister.bind(
    experienceRegisterController,
  ),
);

experienceRegisterRouter.post(
  "/search",
  authenticate,
  experienceRegisterController.searchExperienceRegister.bind(
    experienceRegisterController,
  ),
);

experienceRegisterRouter.delete(
  "/delete",
  authenticate,
  experienceRegisterController.deleteExperienceRegister.bind(
    experienceRegisterController,
  ),
);
export default experienceRegisterRouter;
