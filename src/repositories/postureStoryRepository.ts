import { injectable } from "tsyringe";
import { Database } from "../config/database";
import {
  PostureStoryModel,
  SearchClientPostureStoryModel,
  SearchPostureStoryModel,
} from "../models/posture-story";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class PostureStoryRepository {
  constructor(private db: Database) {}

  async createPostureStory(ps: PostureStoryModel): Promise<any> {
    try {
      const sql =
        "CALL InsertPostureStory(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        ps.title,
        ps.content,
        ps.image_link,
        ps.posted_date,
        ps.author_name,
        ps.is_draft,
        ps.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updatePostureStory(ps: PostureStoryModel): Promise<any> {
    try {
      const sql =
        "CALL UpdatePostureStory(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        ps.posture_story_id,
        ps.title,
        ps.content,
        ps.image_link,
        ps.posted_date,
        ps.author_name,
        ps.is_draft,
        ps.view_count,
        ps.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateViewCountPostureStory(posture_story_id: number): Promise<any> {
    try {
      const sql = "CALL UpdateViewCountPostureStory(?, @err_code, @err_msg)";
      await this.db.query(sql, [posture_story_id]);
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deletePostureStory(posture_story_id: number): Promise<any> {
    try {
      const sql = "CALL DeletePostureStory(?, @err_code, @err_msg)";
      await this.db.query(sql, [posture_story_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailPostureStory(posture_story_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailPostureStory(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [posture_story_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailClientPostureStory(posture_story_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailClientPostureStory(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [posture_story_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchPostureStories(
    search_ps_model: SearchPostureStoryModel,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchPostureStories(?, ?, ?, ?, ? ,?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_ps_model.page_index,
        search_ps_model.page_size,
        search_ps_model.search_content,
        search_ps_model.is_draft,
        search_ps_model.from_date,
        search_ps_model.to_date,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchClientPostureStories(
    search_client_ps: SearchClientPostureStoryModel,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchClientPostureStories(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_client_ps.page_index,
        search_client_ps.page_size,
        search_client_ps.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
