import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { DatabaseError } from "../utils/DatabaseError";
import { FAQ, SearchFAQModel } from "../models/faq";

@injectable()
export class FAQRepository {
  constructor(private db: Database) {}

  async createFAQ(faq: FAQ): Promise<any> {
    try {
      const sql = "CALL InsertFAQ(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        faq.question,
        faq.answer,
        faq.topic_id,
        faq.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateFAQ(faq: FAQ): Promise<any> {
    try {
      const sql = "CALL UpdateFAQ(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        faq.faq_id,
        faq.question,
        faq.answer,
        faq.topic_id,
        faq.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getFAQDetail(faq_id: number): Promise<any> {
    try {
      const sql = "CALL GetFAQDetail(?, @err_code, @err_msg)";
      let [results] = await this.db.query(sql, [faq_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteFAQ(faq_id: number): Promise<any> {
    try {
      const sql = "CALL DeleteFAQ(?, @err_code, @err_msg)";
      await this.db.query(sql, [faq_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchFAQs(faq_search: SearchFAQModel): Promise<any> {
    try {
      const sql = "CALL SearchFAQs(?, ?, ?, ?, @err_code, @err_msg)";
      let [results] = await this.db.query(sql, [
        faq_search.pageIndex,
        faq_search.pageSize,
        faq_search.search_content,
        faq_search.topic_id,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}