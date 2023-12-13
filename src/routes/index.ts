import { Router } from "express";
import core_router from "../core/routes";
import articleAuthorRouter from "./articleAuthorRouter";
import bookAuthorRouter from "./bookAuthorRouter";
import bookRouter from "./bookRouter";
import branchRegisterRouter from "./branchRegisterRouter";
import branchRouter from "./branchRouter";
import cityRouter from "./cityRouter";
import customerRouter from "./customerRouter";
import dashboardRouter from "./dashboardRouter";
import emailRouter from "./emailRouter";
import employeeRouter from "./employeeRouter";
import experienceRegisterRouter from "./experienceRegisterRouter";
import faqRouter from "./faqRouter";
import faqTopicRouter from "./faqTopicRouter";
import growthArticleRouter from "./growthArticleRouter copy";
import growthStoryRouter from "./growthStoryRouter";
import lateStoryRouter from "./lateStoryRouter";
import licenseOfInventionRouter from "./licenseOfInventionRouter";
import newsRouter from "./newsRouter";
import obesityStoryRouter from "./obesityRouter";
import pageRouter from "./pageRouter";
import positionRouter from "./positionRouter";
import postureStoryRouter from "./postureStoryRouter";
import requestRouter from "./requestRouter";
import researchArticleRouter from "./researchArticleRouter";
import researcherRouter from "./researcherRouter";
import roleRouter from "./roleRouter";
import slideRouter from "./slideRouter";
import testRegisterRouter from "./testRegisterRouter";
import userRouter from "./userRouter";

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
router.use("/late-story", lateStoryRouter);
router.use("/obesity-story", obesityStoryRouter);
router.use("/growth-article", growthArticleRouter);
router.use("/research-article", researchArticleRouter);
router.use("/article-author", articleAuthorRouter);
router.use("/license-of-invention", licenseOfInventionRouter);
router.use("/book-author", bookAuthorRouter);
router.use("/book", bookRouter);

export default router;
