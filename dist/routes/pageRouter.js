"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const pageController_1 = require("../controllers/pageController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const pageRouter = (0, express_1.Router)();
const pageController = tsyringe_1.container.resolve(pageController_1.PageController);
pageRouter.get('/get-by-id/:id', pageController.getPageById.bind(pageController));
pageRouter.get('/dropdown', pageController.getPageDropdown.bind(pageController));
pageRouter.post('/create', authMiddleware_1.authenticate, pageController.createPage.bind(pageController));
pageRouter.post('/update', authMiddleware_1.authenticate, pageController.updatePage.bind(pageController));
pageRouter.post('/delete', authMiddleware_1.authenticate, pageController.deletePage.bind(pageController));
pageRouter.post('/search', pageController.searchPage.bind(pageController));
exports.default = pageRouter;
