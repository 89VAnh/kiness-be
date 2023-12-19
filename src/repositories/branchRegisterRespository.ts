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
        "CALL SearchBranchRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search.page_index,
        search.page_size,
        search.user_id,
        search.search_conent,
        search.branch_name,
        search.phone,
        search.address,
        search.city_name,
        search.status,
        search.from_date,
        search.to_date,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteBranchRegister(list_json: any, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteRegisterBranchMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
