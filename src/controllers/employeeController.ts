import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Employee } from "../models/employee";
import { EmployeeService } from "../services/employeeService";

@injectable()
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  async getEmployeeDropdown(_: Request, res: Response): Promise<void> {
    try {
      const data = await this.employeeService.getEmployeeDropdown();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getEmployeeById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data: any = await this.employeeService.getEmployeeById(id);
      if (data && data.length > 0) {
        let employee: any = data[0][0];
        if (employee) {
          employee.employee_customer = data[1];
          res.json(employee);
        } else {
          res.json({ message: "Bản ghi không tồn tại" });
        }
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employee = req.body as Employee;
      await this.employeeService.createEmployee(employee);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employee = req.body as Employee;
      await this.employeeService.updateEmployee(employee);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; lu_user_id: string };
      await this.employeeService.deleteEmployee(
        object.list_json,
        object.lu_user_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchEmployee(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        page_index: number;
        page_size: number;
        user_id: string;
        search_content: string;
        employee_id: string;
        fullname: string;
        phone_number: string;
        email: string;
        position_id: number;
        department_id: number;
      };
      const data: any = await this.employeeService.searchEmployee(
        object.page_index,
        object.page_size,
        object.user_id,
        object.search_content,
        object.employee_id,
        object.fullname,
        object.phone_number,
        object.email,
        object.position_id,
      );
      if (data) {
        res.json({
          total_items: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: object.page_index,
          page_size: object.page_size,
          data: data,
          page_count: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.page_size ? object.page_size : 1),
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      var user_id = req.body.user_id;
      var old_password = req.body.old_password;
      var new_password = req.body.new_password;
      var lu_user_id = req.body.lu_user_id;
      await this.employeeService.changePassword(
        user_id,
        old_password,
        new_password,
        lu_user_id,
      );
      res.json({ message: "Đổi mật khẩu thành công", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      var user_name = req.body.user_name;
      var email = req.body.email;
      await this.employeeService.resetPassword(user_name, email);
      res.json({ message: "Đổi mật khẩu thành công", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async resetPasswordByAdmin(req: Request, res: Response): Promise<void> {
    try {
      var user_id = req.body.user_id;
      var lu_user_id = req.body.lu_user_id;
      var new_password = await this.employeeService.resetPasswordByAdmin(
        user_id,
        lu_user_id,
      );
      res.json({
        message: `Đổi mật khẩu thành công. Mật khẩu mới là ${new_password}`,
        success: true,
        password: new_password,
      });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }
}
