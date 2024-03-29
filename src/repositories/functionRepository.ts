import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { FunctionModel, SearchFunctionsModel } from "../models/function";

@injectable()
export class FunctionRepository {
  constructor(private db: Database) {}

  async createFunction(functionModel: FunctionModel): Promise<any> {
    try {
      const sql =
        "CALL InsertFunction(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        functionModel.function_id,
        functionModel.parent_id,
        functionModel.function_name,
        functionModel.url,
        functionModel.description,
        functionModel.sort_order,
        functionModel.level,
        functionModel.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateFunction(func: FunctionModel): Promise<any> {
    try {
      const sql =
        "CALL UpdateFunction(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        func.function_id,
        func.parent_id,
        func.function_name,
        func.url,
        func.description,
        func.sort_order,
        func.level,
        func.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteFunction(list_json: any, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteFunction(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getFunctionById(id: string): Promise<any> {
    try {
      const sql = "CALL GetFunctionById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchFunction(search: SearchFunctionsModel): Promise<any[]> {
    try {
      const sql = "CALL SearchFunctions(?, ?, ?, ?, ?, @err_code, @err_msg)";

      const [results] = await this.db.query(sql, [
        search.page_index || 0,
        search.page_size || 0,
        search.search_content,
        search.function_id,
        search.parent_id,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getFunctionsByRolesId(role_id: string) {
    try {
      const sql = "CALL GetActiveFunctionByRoleId(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [role_id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
