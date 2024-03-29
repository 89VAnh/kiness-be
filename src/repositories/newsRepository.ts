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

  async deleteNews(list_json: any, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteNewsMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
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
    page_index: number,
    page_size: number,
    search_content: string,
    news_title: string,
    content: string,
  ): Promise<any> {
    try {
      const sql = "CALL SearchNews(?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        page_index,
        page_size,
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
