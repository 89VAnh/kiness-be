import { injectable } from "tsyringe";
import { Database } from "../config/database";
import {
  LateStoryModel,
  SearchClientLateStoryModel,
  SearchLateStoryModel,
} from "../models/late-story";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class LateStoryRepository {
  constructor(private db: Database) {}

  async createLateStory(ls: LateStoryModel): Promise<any> {
    try {
      const sql =
        "CALL InsertLateStory(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        ls.title,
        ls.content,
        ls.image_link,
        ls.posted_date,
        ls.author_name,
        ls.is_draft,
        ls.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateLateStory(ls: LateStoryModel): Promise<any> {
    try {
      const sql =
        "CALL UpdateLateStory(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        ls.late_story_id,
        ls.title,
        ls.content,
        ls.image_link,
        ls.posted_date,
        ls.author_name,
        ls.is_draft,
        ls.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateViewCountLateStory(late_story_id: number): Promise<any> {
    try {
      const sql = "CALL UpdateViewCountLateStory(?, @err_code, @err_msg)";
      await this.db.query(sql, [late_story_id]);
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteLateStory(late_story_id: number): Promise<any> {
    try {
      const sql = "CALL DeleteLateStory(?, @err_code, @err_msg)";
      await this.db.query(sql, [late_story_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailLateStory(late_story_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailLateStory(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [late_story_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailClientLateStory(late_story_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailClientLateStory(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [late_story_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchLateStories(search_ls_model: SearchLateStoryModel): Promise<any> {
    try {
      const sql =
        "CALL SearchLateStories(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_ls_model.page_index,
        search_ls_model.page_size,
        search_ls_model.search_content,
        search_ls_model.is_draft,
        search_ls_model.from_date,
        search_ls_model.to_date,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchClientLateStories(
    search_client_ls: SearchClientLateStoryModel,
  ): Promise<any> {
    try {
      const sql = "CALL SearchClientLateStories(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_client_ls.page_index,
        search_client_ls.page_size,
        search_client_ls.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
