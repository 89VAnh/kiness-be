import { Router } from 'express';
import { container } from 'tsyringe';
import { SlideController } from '../controllers/slideController';
import { authenticate } from "../middlewares/authMiddleware";

const slideRouter = Router();
const slideController = container.resolve(SlideController);
slideRouter.get('/get-by-id/:id', slideController.getSlideById.bind(slideController));
slideRouter.get('/dropdown', slideController.getSlideDropdown.bind(slideController));
slideRouter.post('/create', authenticate, slideController.createSlide.bind(slideController));
slideRouter.post('/update', authenticate, slideController.updateSlide.bind(slideController));
slideRouter.post('/delete', authenticate, slideController.deleteSlide.bind(slideController));
slideRouter.post('/search', slideController.searchSlide.bind(slideController));
export default slideRouter;