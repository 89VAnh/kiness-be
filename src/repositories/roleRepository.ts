import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Role, SearchRole } from "../models/role";

@injectable()
export class RoleRepository {
  constructor(private db: Database) {}

  async createRole(role: Role): Promise<any> {
    try {
      const sql = "CALL InsertRole(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        role.role_name,
        role.role_code,
        role.description,
        role.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateRole(role: Role): Promise<any> {
    try {
      const sql = "CALL UpdateRole(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        role.role_id,
        role.role_name,
        role.role_code,
        role.description,
        role.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteRole(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteRoleMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getRoleById(id: string): Promise<any> {
    try {
      const sql = "CALL GetRoleById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getRoleDropdown(): Promise<any> {
    try {
      const sql = "CALL GetRoleDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchRole(search: SearchRole): Promise<any> {
    try {
      const sql = "CALL SearchRole(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search.page_index,
        search.page_size,
        search.search_content,
        search.role_name,
        search.role_code,
        search.description,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
