import { Router } from "express";
import { container } from "tsyringe";
import { BookController } from "../controllers/bookController";
import { authenticate } from "../middlewares/authMiddleware";

const bookRouter = Router();
const bookController = container.resolve(BookController);

bookRouter.post(
  "/create",
  authenticate,
  bookController.createBook.bind(bookController),
);

bookRouter.post(
  "/update",
  authenticate,
  bookController.updateBook.bind(bookController),
);

bookRouter.post(
  "/delete",
  authenticate,
  bookController.deleteBook.bind(bookController),
);

bookRouter.get(
  "/get-detail/:id",
  authenticate,
  bookController.getDetailBook.bind(bookController),
);

bookRouter.post(
  "/search",
  authenticate,
  bookController.searchBooks.bind(bookController),
);

export default bookRouter;
