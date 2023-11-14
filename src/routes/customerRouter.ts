import { Router } from "express";
import { container } from "tsyringe";
import { CustomerController } from "../controllers/customerController";
import { authenticate } from "../middlewares/authMiddleware";

const customerRouter = Router();
const customerController = container.resolve(CustomerController);
customerRouter.get(
  "/get-by-id/:id",
  authenticate,
  customerController.getCustomerById.bind(customerController),
);
customerRouter.get(
  "/dropdown",
  authenticate,
  customerController.getCustomerDropdown.bind(customerController),
);
customerRouter.post(
  "/create",
  customerController.createCustomer.bind(customerController),
);
customerRouter.post(
  "/update",
  authenticate,
  customerController.updateCustomer.bind(customerController),
);
customerRouter.delete(
  "/delete",
  authenticate,
  customerController.deleteCustomer.bind(customerController),
);
customerRouter.post(
  "/search",
  authenticate,
  customerController.searchCustomer.bind(customerController),
);
export default customerRouter;
