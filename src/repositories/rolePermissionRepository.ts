import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { DeleteRolePermissionModel } from "../models/role-permission";

@injectable()
export class RolePermissionRepository {
  constructor(private db: Database) {}

  async createRolePermission(
    role_permission_list: any,
    created_by_user_id: string,
  ): Promise<any> {
    try {
      const sql = "CALL InsertRolePermission(?, ?, @err_code, @err_msg)";
      let listString = JSON.stringify(role_permission_list);
      let data = await this.db.query(sql, [listString, created_by_user_id]);
      console.log(data);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteRolePermission(object: DeleteRolePermissionModel): Promise<any> {
    try {
      const sql = "CALL DeleteRolePermission(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        object.role_id,
        object.function_id,
        object.action_code,
        object.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getRolePermission(role_id: any, function_id: string): Promise<any> {
    try {
      const sql = "CALL GetActiveRolePermission(?, ?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [role_id, function_id]);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
