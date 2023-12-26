import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { HistoryModel, SearchHistoryModel } from "../models/history";

@injectable()
export class HistoryRepository {
  constructor(private db: Database) {}

  async createHistory(history: HistoryModel): Promise<any> {
    try {
      const sql = "CALL InsertHistory(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        history.year,
        history.content,
        history.sort_order,
        history.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateHistory(history: HistoryModel): Promise<any> {
    try {
      const sql = "CALL UpdateHistory(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        history.history_id,
        history.year,
        history.content,
        history.sort_order,
        history.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteHistory(id: number, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteHistory(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [id, lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getHistoryDetail(id: number): Promise<any> {
    try {
      const sql = "CALL GetHistoryDetail(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchHistories(search: SearchHistoryModel): Promise<any> {
    try {
      console.log(search.page_index, search.page_size, search.search_content);
      const sql = "CALL SearchHistories(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search.page_index,
        search.page_size,
        search.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
