import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { News } from "../models/news";

@injectable()
export class NewsRepository {
  constructor(private db: Database) {}

  async createNews(news: News): Promise<any> {
    try {
      const sql = "CALL InsertNews(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";

      await this.db.query(sql, [
        news.news_title,
        news.content,
        news.content_html,
        news.thumbnail,
        (news.views = 0),
        news.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateNews(news: News): Promise<any> {
    try {
      const sql = "CALL UpdateNews(?, ?, ?, ?, ?, ?, ? ,@err_code, @err_msg)";
      await this.db.query(sql, [
        news.news_id,
        news.news_title,
        news.content,
        news.content_html,
        news.thumbnail,
        news.views,
        news.lu_user_id,
      ]);

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteNews(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteNewsMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getNewsById(id: string): Promise<any> {
    try {
      const sql = "CALL GetNewsById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchNews(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    news_title: string,
    content: string,
  ): Promise<any> {
    try {
      const sql = "CALL SearchNews(?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content,
        news_title,
        content,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
