import { Router } from "express";
import newsRouter from "./newsRouter";
import userRouter from "./userRouter";
import customerRouter from "./customerRouter";
import branchRouter from "./branchRouter";
import cityRouter from "./cityRouter";
import pageRouter from "./pageRouter";

const router = Router();

router.use("/news", newsRouter);
router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/cities", cityRouter);
router.use("/pages", pageRouter);
router.use("/branches", branchRouter);

export default router;
