import { injectable } from "tsyringe";
import { DiagramModel, SearchNodesModel } from "../models/diagram";
import { Database } from "../config/database";

@injectable()
export class DiagramRepository {
  constructor(private db: Database) {}

  async createNode(diagram: DiagramModel): Promise<any> {
    try {
      const sql =
        "CALL InsertNode(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        diagram.node_id,
        diagram.parent_id,
        diagram.node_name,
        diagram.color,
        diagram.sort_order,
        diagram.level,
        diagram.created_by_user_id
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateNode(diagram: DiagramModel): Promise<any> {
    try {
      const sql =
        "CALL UpdateNode(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        diagram.node_id,
        diagram.parent_id,
        diagram.node_name,
        diagram.color,
        diagram.sort_order,
        diagram.level,
        diagram.lu_user_id
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteNode(list_json: any): Promise<any> {
    try {
      const sql = "CALL DeleteNode(?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json)]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getNodeById(id: string): Promise<any> {
    try {
      const sql = "CALL GetNodeById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchNodes(
    model: SearchNodesModel
  ): Promise<any[]> {
    try {
      const sql =
        "CALL SearchNodes(?, ?, ?, ?, ?, ?, ?, ?, ?,@err_code, @err_msg)";

      const [results] = await this.db.query(sql, [
        model.pageIndex,
        model.pageSize,
        model.search_content,
        model.node_id,
        model.parent_id,
        model.node_name,
        model.color,
        model.sort_order,
        model.level
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
