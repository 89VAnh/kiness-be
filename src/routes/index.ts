import { Router } from "express";
import newsRouter from "./newsRouter";

const router = Router();

router.use("/news", newsRouter);

export default router;
