import { Router } from "express";
import { container } from "tsyringe";
import { TestRegisterController } from "../controllers/testRegisterController";
import { authenticate } from "../middlewares/authMiddleware";

const testRegisterRouter = Router();
const testRegisterController = container.resolve(TestRegisterController);

testRegisterRouter.post(
  "/create",
  testRegisterController.createTestRegister.bind(testRegisterController),
);

testRegisterRouter.post(
  "/update-status",
  testRegisterController.updateTestRegisterStatus.bind(testRegisterController),
);

testRegisterRouter.post(
  "/search",
  authenticate,
  testRegisterController.searchTestRegister.bind(testRegisterController),
);

testRegisterRouter.delete(
  "/delete",
  authenticate,
  testRegisterController.deleteTestRegister.bind(testRegisterController),
);

testRegisterRouter.post(
  "/print",
  authenticate,
  testRegisterController.printTestRegister.bind(testRegisterController),
);
export default testRegisterRouter;
