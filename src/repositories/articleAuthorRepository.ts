import { injectable } from "tsyringe";
import { Database } from "../config/database";
import {
  ArticleAuthor,
  ArticleAuthorSearchParams,
} from "../models/article-author";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class ArticleAuthorRepository {
  constructor(private db: Database) {}

  async createArticleAuthor(req: ArticleAuthor): Promise<any> {
    try {
      const sql = "CALL InsertArticleAuthor(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [req.name, req.link, req.created_by_user_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateArticleAuthor(req: ArticleAuthor): Promise<any> {
    try {
      const sql = "CALL UpdateArticleAuthor(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        req.author_id,
        req.name,
        req.link,
        req.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getArticleAuthor(article_id: number): Promise<any> {
    try {
      const sql = "CALL GetArticleAuthorById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [article_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteArticleAuthor(
    list_json: any,
    updated_by_id: string,
  ): Promise<any> {
    try {
      const sql = "CALL DeleteArticleAuthorMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchArticleAuthor(
    search_param: ArticleAuthorSearchParams,
  ): Promise<any> {
    try {
      const sql = "CALL SearchArticleAuthors(?, ?, ?, @err_code, @err_msg)";
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

  async getArticleAuthorDropdown(): Promise<any> {
    try {
      const sql = "CALL GetAuthorDropdown(@err_code, @err_msg)";
      var [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
