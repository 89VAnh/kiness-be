import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Customer } from "../models/customer";

@injectable()
export class CustomerRepository {
  constructor(private db: Database) {}
  async createCustomer(customer: Customer): Promise<any> {
    try {
      const sql =
        "CALL InsertCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        customer.branch_id,
        customer.customer_id,
        customer.customer_name,
        customer.phone_number,
        customer.email,
        customer.address,
        customer.password,
        customer.user_id,
        customer.type,
        customer.description,
        customer.is_guest,
        customer.profile_id,
        customer.first_name,
        customer.middle_name,
        customer.last_name,
        customer.avatar,
        customer.gender,
        customer.birthday,
        customer.customer_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // async updateCustomer(customer: Customer): Promise<any> {
  //   try {
  //     const sql =
  //       "CALL UpdateCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
  //     // await this.db.query(sql, [
  //     //   customer.branch_id,
  //     //   customer.customer_id,
  //     //   customer.fullname,
  //     //   customer.phone_number,
  //     //   customer.email,
  //     //   customer.position_id,
  //     //   customer.department_id,
  //     //   customer.password,
  //     //   JSON.stringify(customer.list_json_customer_customer),
  //     //   customer.type,
  //     //   customer.description,
  //     //   customer.is_guest,
  //     //   customer.first_name,
  //     //   customer.middle_name,
  //     //   customer.last_name,
  //     //   customer.avatar,
  //     //   customer.gender,
  //     //   customer.date_of_birth,
  //     //   customer.role_id,
  //     //   customer.lu_user_id,
  //     // ]);
  //     return true;
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // }

  async deleteCustomer(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteCustomerMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getCustomerById(id: string): Promise<any> {
    try {
      const sql = "CALL GetCustomerById(?, @err_code, @err_msg)";
      const results = await this.db.queryList(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getCustomerDropdown(): Promise<any> {
    try {
      const sql = "CALL GetCustomerDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchCustomer(
    pageIndex: number,
    pageSize: number,
    user_id: string,
    search_content: string,
    customer_id: string,
    fullname: string,
    phone_number: string,
    email: string,
    position_id: number,
    department_id: number,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        user_id,
        search_content,
        customer_id,
        fullname,
        phone_number,
        email,
        position_id,
        department_id,
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
