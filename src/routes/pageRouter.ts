import { Router } from 'express';
import { container } from 'tsyringe';
import { PageController } from '../controllers/pageController';
import { authenticate } from "../middlewares/authMiddleware";

const pageRouter = Router();
const pageController = container.resolve(PageController);
pageRouter.get('/get-by-id/:id', pageController.getPageById.bind(pageController));
pageRouter.get('/dropdown', pageController.getPageDropdown.bind(pageController));
pageRouter.post('/create', authenticate, pageController.createPage.bind(pageController));
pageRouter.post('/update', authenticate, pageController.updatePage.bind(pageController));
pageRouter.post('/delete', authenticate, pageController.deletePage.bind(pageController));
pageRouter.post('/search', pageController.searchPage.bind(pageController));
export default pageRouter;