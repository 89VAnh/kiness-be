import { Router } from "express";
import { VideoController } from "../controllers/videoController";
import { authenticate } from "../middlewares/authMiddleware";
import { container } from "tsyringe";

const videoRouter = Router();
const videoController = container.resolve(VideoController);

videoRouter.post(
    "/create",
    authenticate,
    videoController.createVideo.bind(videoController)
);

videoRouter.post(
    "/update",
    authenticate,
    videoController.updateVideo.bind(videoController)
);

videoRouter.get(
    "/get-detail/:id",
    videoController.getDetailVideo.bind(videoController)
);

videoRouter.delete(
    "/delete/:id",
    authenticate,
    videoController.deleteVideo.bind(videoController)
);

videoRouter.post(
    "/search",
    videoController.SearchVideos.bind(videoController)
);
export default videoRouter;
