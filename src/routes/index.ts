import { Router } from "express";
import newsRouter from "./newsRouter";
import userRouter from "./userRouter";
import customerRouter from "./customerRouter";

const router = Router();

router.use("/news", newsRouter);
router.use("/users", userRouter);
router.use("/customers", customerRouter);

export default router;
