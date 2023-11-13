import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { TestRegister } from "../models/test-register";

@injectable()
export class TestRegisterRepository {
  constructor(private db: Database) {}

  async createTestRegister(testRegister: TestRegister): Promise<any> {
    try {
      const sql =
        "CALL InsertTestRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        testRegister.branch_id,
        testRegister.fullname,
        testRegister.gender,
        testRegister.level,
        testRegister.date,
        testRegister.phone_number,
        testRegister.address,
        testRegister.detail,
        testRegister.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateTestRegister(testRegister: TestRegister): Promise<any> {
    try {
      const sql =
        "CALL UpdateTestRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        testRegister.register_id,
        testRegister.branch_id,
        testRegister.fullname,
        testRegister.gender,
        testRegister.level,
        testRegister.date,
        testRegister.phone_number,
        testRegister.address,
        testRegister.detail,
        testRegister.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateTestRegisterStatus(testRegister: TestRegister): Promise<any> {
    try {
      const sql = "CALL UpdateTestRegisterStatus(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        testRegister.register_id,
        testRegister.status,
        testRegister.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchTestRegister(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    branch_name: string,
    phone: string,
    address: string,
    from_date: Date,
    to_date: Date,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchTestRegister(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content,
        branch_name,
        phone,
        address,
        from_date,
        to_date,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteTestRegister(
    list_json: any,
    updated_by_id: string,
  ): Promise<any> {
    try {
      const sql = "CALL DeleteRegisterTestMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
