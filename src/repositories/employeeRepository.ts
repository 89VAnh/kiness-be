import { injectable } from "tsyringe";
import { Employee } from "../models/employee";
import { Database } from "../config/database";

@injectable()
export class EmployeeRepository {
  constructor(private db: Database) {}

  async createEmployee(employee: Employee): Promise<any> {
    try {
      const sql =
        "CALL InsertEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        employee.branch_id,
        employee.employee_id,
        employee.fullname,
        employee.phone_number,
        employee.email,
        employee.position_id,
        employee.password,
        employee.user_id,
        employee.type,
        employee.description,
        employee.is_guest,
        employee.profile_id,
        employee.first_name,
        employee.middle_name,
        employee.last_name,
        employee.avatar,
        employee.gender,
        employee.date_of_birth,
        employee.user_role_id,
        employee.role_id,
        employee.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateEmployee(employee: Employee): Promise<any> {
    try {
      const sql =
        "CALL UpdateEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        employee.user_id,
        employee.employee_id,
        employee.fullname,
        employee.phone_number,
        new Date(employee.date_of_birth),
        employee.branch_id,
        employee.position_id,
        employee.gender,
        employee.email,
        employee.avatar,
        employee.role_id,
        employee.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteEmployee(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteEmployeeMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getEmployeeById(id: string): Promise<any> {
    try {
      const sql = "CALL GetEmployeeById(?, @err_code, @err_msg)";
      const results = await this.db.queryList(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getEmployeeDropdown(): Promise<any> {
    try {
      const sql = "CALL GetEmployeeDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchEmployee(
    pageIndex: number,
    pageSize: number,
    user_id: string,
    search_content: string,
    employee_id: string,
    fullname: string,
    phone_number: string,
    email: string,
    position_id: number,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        user_id,
        search_content,
        employee_id,
        fullname,
        phone_number,
        email,
        position_id,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async changePassword(
    user_id: string,
    old_password: string,
    new_password: string,
    lu_user_id: string,
  ) {
    try {
      const sql = "CALL ChangePassword(?, ?, ?, ?,@err_code, @err_msg)";
      await this.db.query(sql, [
        user_id,
        old_password,
        new_password,
        lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async resetPassword(user_name: string, email: string, new_password: string) {
    try {
      const sql = "CALL ResetPassword(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [user_name, email, new_password]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async resetPasswordByAdmin(
    user_id: string,
    new_password: string,
    lu_user_id: string,
  ) {
    try {
      const sql = "CALL ResetPasswordByAdmin(?, ?, ?, @err_code, @err_msg)";
      var [result] = await this.db.query(sql, [
        user_id,
        new_password,
        lu_user_id,
      ]);
      if (result.length > 0) {
        var email = result[0].email;
      } else throw new Error("Không tồn tại email");
      return email;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
