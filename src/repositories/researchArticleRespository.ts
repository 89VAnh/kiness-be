import { injectable } from "tsyringe";
import { Database } from "../config/database";
import {
  ResearchArticle,
  ResearchArticleSearchParams,
} from "../models/research-article";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class ResearchArticleRepository {
  constructor(private db: Database) {}

  async createResearchArticle(req: ResearchArticle): Promise<any> {
    try {
      const sql =
        "CALL InsertResearchArticle(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        req.title,
        req.article_link,
        req.content,
        req.issuers,
        req.year_of_release,
        req.list_json_author_id,
        req.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateResearchArticle(req: ResearchArticle): Promise<any> {
    try {
      const sql =
        "CALL UpdateResearchArticle(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        req.article_id,
        req.title,
        req.article_link,
        req.content,
        req.issuers,
        req.year_of_release,
        req.list_json_author_id,
        req.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getResearchArticle(article_id: number): Promise<any> {
    try {
      const sql = "CALL GetResearchArticleById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [article_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteResearchArticle(
    list_json: any,
    updated_by_id: string,
  ): Promise<any> {
    try {
      const sql = "CALL DeleteResearchArticleMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchResearchArticle(
    search_param: ResearchArticleSearchParams,
  ): Promise<any> {
    try {
      const sql = "CALL SearchResearchArticles(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_param.page_index,
        search_param.page_size,
        search_param.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
