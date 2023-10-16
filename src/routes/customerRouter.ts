import { Router } from 'express';
import { container } from 'tsyringe';
import { CustomerController } from '../controllers/customerController';

const customerRouter = Router();
const customerController = container.resolve(CustomerController);
customerRouter.get('/get-by-id/:id', customerController.getCustomerById.bind(customerController));
customerRouter.get('/dropdown', customerController.getCustomerDropdown.bind(customerController));
customerRouter.post('/create', customerController.createCustomer.bind(customerController));
customerRouter.post('/update', customerController.updateCustomer.bind(customerController));
customerRouter.post('/delete', customerController.deleteCustomer.bind(customerController));
customerRouter.post('/search', customerController.searchCustomer.bind(customerController));
export default customerRouter;