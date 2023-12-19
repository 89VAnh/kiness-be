import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Slide } from "../models/slide";

@injectable()
export class SlideRepository {
  constructor(private db: Database) {}

  async createSlide(slide: Slide): Promise<any> {
    try {
      const sql = "CALL InsertSlide(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        slide.slide_caption,
        slide.image_big,
        slide.image_small,
        slide.order,
        slide.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateSlide(slide: Slide): Promise<any> {
    try {
      const sql = "CALL UpdateSlide(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        slide.slide_id,
        slide.slide_caption,
        slide.image_big,
        slide.image_small,
        slide.order,
        slide.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteSlide(list_json: any, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteSlideMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getSlideById(id: string): Promise<any> {
    try {
      const sql = "CALL GetSlideById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getSlideDropdown(): Promise<any> {
    try {
      const sql = "CALL GetSlideDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchSlide(
    slideIndex: number,
    slideSize: number,
    search_content: string,
  ): Promise<any> {
    try {
      const sql = "CALL SearchSlide(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        slideIndex,
        slideSize,
        search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
