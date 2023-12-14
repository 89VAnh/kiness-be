import { Database } from "../config/database";
import { injectable } from "tsyringe";
import { DatabaseError } from "../utils/DatabaseError";
import {
  GrowthArticleModel,
  SearchClientGrowthArticleModel,
  SearchGrowthArticleModel,
} from "../models/growth-article";

@injectable()
export class GrowthArticleRepository {
  constructor(private db: Database) {}

  async createGrowthArticle(ga: GrowthArticleModel): Promise<any> {
    try {
      const sql =
        "CALL InsertGrowthArticle(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        ga.title,
        ga.content,
        ga.image_link,
        ga.posted_date,
        ga.author_name,
        ga.is_draft,
        ga.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateGrowthArticle(ga: GrowthArticleModel): Promise<any> {
    try {
      const sql =
        "CALL UpdateGrowthArticle(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        ga.growth_article_id,
        ga.title,
        ga.content,
        ga.image_link,
        ga.posted_date,
        ga.author_name,
        ga.is_draft,
        ga.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateViewCountGrowthArticle(growth_article_id: number): Promise<any> {
    try {
      const sql = "CALL UpdateViewCountGrowthArticle(?, @err_code, @err_msg)";
      await this.db.query(sql, [growth_article_id]);
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteGrowthArticle(growth_article_id: number): Promise<any> {
    try {
      const sql = "CALL DeleteGrowthArticle(?, @err_code, @err_msg)";
      await this.db.query(sql, [growth_article_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailGrowthArticle(growth_article_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailGrowthArticle(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [growth_article_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailClientGrowthArticle(growth_article_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailClientGrowthArticle(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [growth_article_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchGrowthArticles(
    search_ga_model: SearchGrowthArticleModel,
  ): Promise<any> {
    try {
      const sql = "CALL SearchGrowthArticles(?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_ga_model.pageIndex,
        search_ga_model.pageSize,
        search_ga_model.search_content,
        search_ga_model.is_draft,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchClientGrowthArticles(
    search_client_ga: SearchClientGrowthArticleModel,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchClientGrowthArticles(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_client_ga.pageIndex,
        search_client_ga.pageSize,
        search_client_ga.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
