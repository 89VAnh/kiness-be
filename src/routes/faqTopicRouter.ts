import { Router } from "express";
import { container } from "tsyringe";
import { authenticate } from "../middlewares/authMiddleware";
import { FAQTopicController } from "../controllers/faqTopicController";

const faqTopicRouter = Router();
const faqTopicController = container.resolve(FAQTopicController);

faqTopicRouter.post(
    "/create",
    authenticate,
    faqTopicController.createFAQTopic.bind(
        faqTopicController
    )
);

faqTopicRouter.post(
    "/update",
    authenticate,
    faqTopicController.updateFAQTopic.bind(
        faqTopicController
    )
);

faqTopicRouter.get(
    "/get-detail/:id",
    faqTopicController.getFAQTopic.bind(
        faqTopicController
    )
);

faqTopicRouter.delete(
    "/delete/:id",
    authenticate,
    faqTopicController.deleteFAQTopic.bind(
        faqTopicController
    )
);

faqTopicRouter.get(
    "/get-dropdown",
    faqTopicController.getFAQTopicDropdown.bind(
        faqTopicController
    )
);

faqTopicRouter.post(
    "/search",
    faqTopicController.searchFAQTopics.bind(
        faqTopicController
    )
);

export default faqTopicRouter;


