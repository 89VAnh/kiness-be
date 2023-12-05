import { Router } from 'express';
import { container } from 'tsyringe';
import { EmployeeController } from '../controllers/employeeController';
import { authenticate } from "../middlewares/authMiddleware";

const employeeRouter = Router();
const employeeController = container.resolve(EmployeeController);
employeeRouter.get('/get-by-id/:id', authenticate, employeeController.getEmployeeById.bind(employeeController));
employeeRouter.get('/dropdown', employeeController.getEmployeeDropdown.bind(employeeController));
employeeRouter.post('/create', employeeController.createEmployee.bind(employeeController));
employeeRouter.post('/update', authenticate, employeeController.updateEmployee.bind(employeeController));
employeeRouter.post('/delete', authenticate, employeeController.deleteEmployee.bind(employeeController));
employeeRouter.post('/search', authenticate, employeeController.searchEmployee.bind(employeeController));
employeeRouter.post('/change-password', employeeController.changePassword.bind(employeeController));
employeeRouter.post('/reset-password', employeeController.resetPassword.bind(employeeController));
employeeRouter.post('/reset-password-by-admin', employeeController.resetPasswordByAdmin.bind(employeeController));
export default employeeRouter;
