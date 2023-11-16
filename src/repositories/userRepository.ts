import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { User } from "../models/user";

@injectable()
export class UserRepository {
  constructor(private db: Database) {}
  async authenticate(username: string, password: string): Promise<any> {
    try {
      const sql = "CALL GetCustomerByAccount(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [username]);
      if (Array.isArray(results) && results.length > 0) {
        let user = results[0];
        if (user.password == password) {
          return user;
        } else {
          return null;
        }
        // return {username: user.customer_name,fullname: user.customer_name};
      }
      return null;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async authenticateEmployee(username: string, password: string): Promise<any> {
    try {
      const sql = "CALL GetUserByAccount(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [username]);
      if (Array.isArray(results) && results.length > 0) {
        let user = results[0];
        if (user.password == password) {
          return user;
        } else {
          return null;
        }
        // return {username: user.customer_name,fullname: user.customer_name};
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createUser(user: User): Promise<any> {
    try {
      const sql =
        "CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@err_code, @err_msg)";
      await this.db.query(sql, [
        user.user_id,
        user.profile_id,
        user.user_name,
        user.password,
        user.type,
        user.description,
        user.first_name,
        user.middle_name,
        user.last_name,
        user.full_name,
        user.avatar,
        user.gender,
        user.date_of_birth,
        user.email,
        user.phone_number,
        user.is_guest,
        user.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateUser(user: User): Promise<any> {
    try {
      const sql =
        "CALL UpdateUser(?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        user.profile_id,
        user.user_id,
        user.type,
        user.description,
        user.first_name,
        user.middle_name,
        user.last_name,
        user.full_name,
        user.avatar,
        user.gender,
        user.date_of_birth,
        user.email,
        user.phone_number,
        user.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async resetPassword(user: User, password: string): Promise<any> {
    try {
      const sql =
        "CALL UpdatePasswordUser(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        user.email,
        user.password,
        user.lu_user_id,
      ]);
      return password;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  
  async changePassword(user: any): Promise<any> {
    try {
      const sql =
        "CALL ChangePasswordUser(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        user.user_name,
        user.password,
        user.new_password,
        user.type,
        user.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteUser(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteUser(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const sql = "CALL GetUserById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getFunctionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetFunctionByUserId(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getActionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetActionByUserId(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchUser(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    user_name: string,
    full_name: string,
    gender: number,
    date_of_birth: Date,
    email: string,
    phone_number: string,
    description: string,
  ): Promise<any[]> {
    try {
      const sql =
        "CALL SearchUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content,
        user_name,
        description,
        full_name,
        gender,
        date_of_birth,
        email,
        phone_number,
      ]);
      console.log(results);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
