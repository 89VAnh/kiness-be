import { injectable } from "tsyringe";
import { Database } from "../config/database";

import {
  LicenseOfInventionModel,
  SearchLicenseOfInventionModel,
} from "../models/license_of_invention";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class LicenseOfInventionRepository {
  constructor(private db: Database) {}

  async createLicenseOfInvention(li: LicenseOfInventionModel): Promise<any> {
    try {
      const sql =
        "CALL InsertLicenseOfInvention(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        li.title,
        li.license_no,
        li.image_url,
        li.description,
        li.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateLicenseOfInvention(li: LicenseOfInventionModel): Promise<any> {
    try {
      const sql =
        "CALL UpdateLicenseOfInvention(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        li.license_id,
        li.title,
        li.license_no,
        li.image_url,
        li.description,
        li.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteLicenseOfInvention(
    license_id: number,
    lu_user_id: string,
  ): Promise<any> {
    try {
      const sql = "CALL DeleteLicenseOfInvention(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [license_id, lu_user_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailLicenseOfInvention(posture_story_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailLicenseOfInvention(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [posture_story_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async SearchLicenses(
    search_li_model: SearchLicenseOfInventionModel,
  ): Promise<any> {
    try {
      const sql = "CALL SearchLicenses(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_li_model.page_index,
        search_li_model.page_size,
        search_li_model.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
