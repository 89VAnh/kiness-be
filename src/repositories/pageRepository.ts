import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Page } from "../models/page";

@injectable()
export class PageRepository {
  constructor(private db: Database) {}

  async createPage(page: Page): Promise<any> {
    try {
      const sql = "CALL InsertPage(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        page.page_title,
        page.page_code,
        page.content,
        page.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updatePage(page: Page): Promise<any> {
    try {
      const sql = "CALL UpdatePage(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        page.page_id,
        page.page_title,
        page.page_code,
        page.content,
        page.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deletePage(list_json: any, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeletePageMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPageById(id: string): Promise<any> {
    try {
      const sql = "CALL GetPageByCode(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPageDropdown(): Promise<any> {
    try {
      const sql = "CALL GetPageDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchPage(
    page_index: number,
    page_size: number,
    search_content: string,
  ): Promise<any> {
    try {
      const sql = "CALL SearchPage(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        page_index,
        page_size,
        search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
