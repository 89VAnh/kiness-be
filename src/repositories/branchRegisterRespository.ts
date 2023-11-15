import { injectable } from "tsyringe";
import { Database } from "../config/database";
import {
  BranchRegister,
  SearchBranchRegister,
} from "../models/branch-register";

@injectable()
export class BranchRegisterRepository {
  constructor(private db: Database) {}

  async createBranchRegister(branchRegister: BranchRegister): Promise<any> {
    try {
      const sql =
        "CALL InsertBranchRegister(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        branchRegister.city_id,
        branchRegister.branch_name,
        branchRegister.phone_number,
        branchRegister.address,
        branchRegister.email,
        branchRegister.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchBranchRegister(search: SearchBranchRegister): Promise<any> {
    try {
      const sql =
        "CALL SearchBranchRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search.pageIndex,
        search.pageSize,
        search.user_id,
        search.search_conent,
        search.branch_name,
        search.phone,
        search.address,
        search.city_name,
        search.from_date,
        search.to_date,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteBranchRegister(
    list_json: any,
    updated_by_id: string,
  ): Promise<any> {
    try {
      console.log(list_json);
      const sql = "CALL DeleteRegisterBranchMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
