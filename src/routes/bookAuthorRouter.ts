import { Router } from "express";
import { container } from "tsyringe";
import { BookAuthorController } from "../controllers/bookAuthorController";
import { authenticate } from "../middlewares/authMiddleware";

const bookAuthorRouter = Router();
const bookAuthorController = container.resolve(BookAuthorController);

bookAuthorRouter.post(
  "/create",
  authenticate,
  bookAuthorController.createBookAuthor.bind(bookAuthorController),
);

bookAuthorRouter.post(
  "/update",
  authenticate,
  bookAuthorController.updateBookAuthor.bind(bookAuthorController),
);

bookAuthorRouter.post(
  "/delete",
  authenticate,
  bookAuthorController.deleteBookAuthor.bind(bookAuthorController),
);

bookAuthorRouter.get(
  "/get-detail/:id",
  authenticate,
  bookAuthorController.getDetailBookAuthor.bind(bookAuthorController),
);

bookAuthorRouter.post(
  "/search",
  authenticate,
  bookAuthorController.searchBookAuthors.bind(bookAuthorController),
);

bookAuthorRouter.get(
  "/get-dropdown",
  authenticate,
  bookAuthorController.getBookAuthorDropdown.bind(bookAuthorController),
);

export default bookAuthorRouter;
