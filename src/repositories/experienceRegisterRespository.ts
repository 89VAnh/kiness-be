import { injectable } from "tsyringe";
import { Database } from "../config/database";
import {
  ExperienceRegister,
  SearchExperienceRegister,
} from "../models/experience-register";

@injectable()
export class ExperienceRegisterRepository {
  constructor(private db: Database) {}

  async createExperienceRegister(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    try {
      const sql =
        "CALL InsertExperienceRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        experienceRegister.branch_id,
        experienceRegister.fullname,
        experienceRegister.gender,
        experienceRegister.level,
        experienceRegister.date,
        experienceRegister.phone_number,
        experienceRegister.address,
        experienceRegister.detail,
        experienceRegister.email,
        experienceRegister.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateExperienceRegister(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    try {
      const sql =
        "CALL UpdateExperienceRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        experienceRegister.register_id,
        experienceRegister.branch_id,
        experienceRegister.fullname,
        experienceRegister.gender,
        experienceRegister.level,
        experienceRegister.date,
        experienceRegister.phone_number,
        experienceRegister.address,
        experienceRegister.detail,
        experienceRegister.email,
        experienceRegister.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateExperienceRegisterStatus(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    try {
      const sql =
        "CALL UpdateExperienceRegisterStatus(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        experienceRegister.register_id,
        experienceRegister.status,
        experienceRegister.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchExperienceRegister(
    search: SearchExperienceRegister,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchExperienceRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search.page_index,
        search.page_size,
        search.user_id,
        search.search_content,
        search.branch_name,
        search.phone,
        search.address,
        search.status,
        search.from_date,
        search.to_date,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteExperienceRegister(
    list_json: any,
    lu_user_id: string,
  ): Promise<any> {
    try {
      const sql =
        "CALL DeleteRegisterExperienceMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
