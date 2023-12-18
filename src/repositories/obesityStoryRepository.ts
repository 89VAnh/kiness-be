import { Database } from "../config/database";
import { injectable } from "tsyringe";
import { DatabaseError } from "../utils/DatabaseError";
import {
  ObesityStoryModel,
  SearchClientObesityStoryModel,
  SearchObesityStoryModel,
} from "../models/obesity-story";

@injectable()
export class ObesityStoryRepository {
  constructor(private db: Database) {}

  async createObesityStory(os: ObesityStoryModel): Promise<any> {
    try {
      const sql =
        "CALL InsertObesityStory(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        os.title,
        os.content,
        os.image_link,
        os.posted_date,
        os.author_name,
        os.is_draft,
        os.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateObesityStory(os: ObesityStoryModel): Promise<any> {
    try {
      const sql =
        "CALL UpdateObesityStory(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        os.obesity_story_id,
        os.title,
        os.content,
        os.image_link,
        os.posted_date,
        os.author_name,
        os.is_draft,
        os.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateViewCountObesityStory(obesity_story_id: number): Promise<any> {
    try {
      const sql = "CALL UpdateViewCountObesityStory(?, @err_code, @err_msg)";
      await this.db.query(sql, [obesity_story_id]);
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteObesityStory(obesity_story_id: number): Promise<any> {
    try {
      const sql = "CALL DeleteObesityStory(?, @err_code, @err_msg)";
      await this.db.query(sql, [obesity_story_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailObesityStory(obesity_story_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailObesityStory(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [obesity_story_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailClientObesityStory(obesity_story_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailClientObesityStory(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [obesity_story_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchObesityStories(
    search_os_model: SearchObesityStoryModel,
  ): Promise<any> {
    try {
      const sql = "CALL SearchObesityStories(?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_os_model.page_index,
        search_os_model.page_size,
        search_os_model.search_content,
        search_os_model.is_draft,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchClientObesityStories(
    search_client_os: SearchClientObesityStoryModel,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchClientObesityStories(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_client_os.page_index,
        search_client_os.page_size,
        search_client_os.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
