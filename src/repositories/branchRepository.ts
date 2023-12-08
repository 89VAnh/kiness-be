import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Branch, SearchBranch } from "../models/branch";

@injectable()
export class BranchRepository {
  constructor(private db: Database) {}

  async createBranch(branch: Branch): Promise<any> {
    try {
      const sql = "CALL InsertBranch(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        branch.city_id,
        branch.branch_name,
        branch.phone,
        branch.fax,
        branch.address,
        branch.thumbnail,
        branch.open_time,
        branch.close_time,
        branch.embed_map,
        branch.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateBranch(branch: Branch): Promise<any> {
    try {
      const sql = "CALL UpdateBranch(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        branch.branch_id,
        branch.city_id,
        branch.branch_name,
        branch.phone,
        branch.fax,
        branch.address,
        branch.thumbnail,
        branch.open_time,
        branch.close_time,
        branch.embed_map,
        branch.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteBranch(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteBranchMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getBranchById(id: string): Promise<any> {
    try {
      const sql = "CALL GetBranchById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getBranchDropdown(city_id: string): Promise<any> {
    try {
      const sql = "CALL GetBranchDropdown(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [city_id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchBranch(search: SearchBranch): Promise<any> {
    try {
      const sql = "CALL SearchBranch(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search.pageIndex,
        search.pageSize,
        search.search_content,
        search.city_id,
        search.branch_name,
        search.phone,
        search.fax,
        search.address,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
