import { Router } from "express";
import newsRouter from "./newsRouter";
import userRouter from "./userRouter";
import customerRouter from "./customerRouter";
import branchRouter from "./branchRouter";
import cityRouter from "./cityRouter";
import pageRouter from "./pageRouter";
import employeeRouter from "./employeeRouter";
import core_router from "../core/routes";

const router = Router();

router.use("/news", newsRouter);
router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/employees", employeeRouter);
router.use("/cities", cityRouter);
router.use("/pages", pageRouter);
router.use("/branches", branchRouter);
router.use("/core", core_router);

export default router;
