import { Router } from "express";
import core_router from "../core/routes";
import branchRegisterRouter from "./branchRegisterRouter";
import branchRouter from "./branchRouter";
import cityRouter from "./cityRouter";
import customerRouter from "./customerRouter";
import dashboardRouter from "./dashboardRouter";
import emailRouter from "./emailRouter";
import employeeRouter from "./employeeRouter";
import experienceRegisterRouter from "./experienceRegisterRouter";
import newsRouter from "./newsRouter";
import pageRouter from "./pageRouter";
import researcherRouter from "./researcherRouter";
import slideRouter from "./slideRouter";
import testRegisterRouter from "./testRegisterRouter";
import userRouter from "./userRouter";
import positionRouter from "./positionRouter";
import faqTopicRouter from "./faqTopicRouter";
import faqRouter from "./faqRouter";
import requestRouter from "./requestRouter";
import growthStoryRouter from "./growthStoryRouter";
import postureStoryRouter from "./postureStoryRouter";
import roleRouter from "./roleRouter";

const router = Router();

router.use("/news", newsRouter);
router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/employees", employeeRouter);
router.use("/cities", cityRouter);
router.use("/pages", pageRouter);
router.use("/slides", slideRouter);
router.use("/branches", branchRouter);
router.use("/positions", positionRouter);
router.use("/experience-register", experienceRegisterRouter);
router.use("/test-register", testRegisterRouter);
router.use("/branch-register", branchRegisterRouter);
router.use("/core", core_router);
router.use("/email", emailRouter);
router.use("/dashboard", dashboardRouter);
router.use("/researcher", researcherRouter);
router.use("/faq-topic", faqTopicRouter);
router.use("/faq", faqRouter);
router.use("/request", requestRouter);
router.use("/growth-story", growthStoryRouter);
router.use("/posture-story", postureStoryRouter);
router.use("/role", roleRouter);

export default router;
