import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from "../middlewares/authMiddleware";
import { FAQController } from "../controllers/faqController";

const faqRouter = Router();
const faqController = container.resolve(FAQController);

faqRouter.post(
  "/create",
  authenticate,
  faqController.createFAQ.bind(faqController),
);

faqRouter.post(
  "/update",
  authenticate,
  faqController.updateFAQ.bind(faqController),
);

faqRouter.delete(
  "/delete/:id",
  authenticate,
  faqController.deleteFAQ.bind(faqController),
);

faqRouter.get(
  "/get-detail/:id",
  faqController.getFAQDetail.bind(faqController),
);

faqRouter.post("/search", faqController.searchFAQs.bind(faqController));

export default faqRouter;
