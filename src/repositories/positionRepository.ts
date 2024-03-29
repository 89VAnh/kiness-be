import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Position } from "../models/position";

@injectable()
export class PositionRepository {
  constructor(private db: Database) {}

  async createPosition(position: Position): Promise<any> {
    try {
      const sql = "CALL InsertPosition(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        position.position_name,
        position.description,
        position.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updatePosition(position: Position): Promise<any> {
    try {
      const sql = "CALL UpdatePosition(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [position.position_name, position.lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deletePosition(list_json: any, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeletePositionMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPositionById(id: string): Promise<any> {
    try {
      const sql = "CALL GetPositionById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPositionDropdown(): Promise<any> {
    try {
      const sql = "CALL GetPositionDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchPosition(
    page_index: number,
    page_size: number,
    search_content: string,
    position_name: string,
  ): Promise<any> {
    try {
      const sql = "CALL SearchPositions(?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        page_index,
        page_size,
        search_content,
        position_name,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
