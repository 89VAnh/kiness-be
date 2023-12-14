import { injectable } from "tsyringe";
import { SearchVideoModel, Video } from "../models/video";
import { Database } from "../config/database";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class VideoRepository {
  constructor(private db: Database) {}

  async createVideo(video: Video): Promise<any> {
    try {
      const sql = "CALL InsertVideo(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        video.video_name,
        video.video_link,
        video.is_foreign,
        video.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateVideo(video: Video): Promise<any> {
    try {
      const sql = "CALL UpdateVideo(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        video.video_id,
        video.video_name,
        video.video_link,
        video.is_foreign,
        video.created_by_user_id,
      ]);
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailVideo(video_id: number): Promise<any> {
    try {
      const sql = "CALL getDetailVideo(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [video_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteVideo(video_id: number): Promise<any> {
    try {
      const sql = "CALL DeleteVideo(?, @err_code, @err_msg)";
      await this.db.query(sql, [video_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchVideos(object: SearchVideoModel): Promise<any> {
    try {
      const sql = "CALL SearchVideos(?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.is_foreign,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
