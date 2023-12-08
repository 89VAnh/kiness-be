import { Router } from "express";
import { container } from "tsyringe";
import { ResearcherController } from "../controllers/researchController";
import { authenticate } from "../middlewares/authMiddleware";

const researcherRouter = Router();
const researcherController = container.resolve(ResearcherController);
researcherRouter.get(
  "/get-by-id/:id",
  researcherController.getResearcherById.bind(researcherController),
);
researcherRouter.post(
  "/create",
  authenticate,
  researcherController.createResearcher.bind(researcherController),
);
researcherRouter.post(
  "/update",
  authenticate,
  researcherController.updateResearcher.bind(researcherController),
);
researcherRouter.post(
  "/delete",
  authenticate,
  researcherController.deleteResearcher.bind(researcherController),
);
researcherRouter.post(
  "/search",
  researcherController.searchResearcher.bind(researcherController),
);

export default researcherRouter;
