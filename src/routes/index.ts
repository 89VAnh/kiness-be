import { Router } from "express";
import core_router from "../core/routes";
import branchRouter from "./branchRouter";
import cityRouter from "./cityRouter";
import customerRouter from "./customerRouter";
import employeeRouter from "./employeeRouter";
import experienceRegisterRouter from "./experienceRegisterRouter";
import newsRouter from "./newsRouter";
import pageRouter from "./pageRouter";
import testRegisterRouter from "./testRegisterRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/news", newsRouter);
router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/employees", employeeRouter);
router.use("/cities", cityRouter);
router.use("/pages", pageRouter);
router.use("/branches", branchRouter);
router.use("/experience-register", experienceRegisterRouter);
router.use("/test-register", testRegisterRouter);
router.use("/core", core_router);

export default router;
