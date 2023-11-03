import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { ExperienceRegister } from "../models/experience-register";

@injectable()
export class ExperienceRegisterRepository {
  constructor(private db: Database) {}

  async createExperienceRegister(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    try {
      const sql =
        "CALL InsertExperienceRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        experienceRegister.branch_id,
        experienceRegister.fullname,
        experienceRegister.gender,
        experienceRegister.level,
        experienceRegister.date,
        experienceRegister.phone_number,
        experienceRegister.address,
        experienceRegister.detail,
        experienceRegister.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchExperienceRegister(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    branch_name: string,
    phone: string,
    address: string,
    from_date: Date,
    to_date: Date,
  ): Promise<any> {
    try {
      const sql =
        "CALL SearchExperienceRegister(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content,
        branch_name,
        phone,
        address,
        from_date,
        to_date,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteExperienceRegister(
    list_json: any,
    updated_by_id: string,
  ): Promise<any> {
    try {
      const sql =
        "CALL DeleteRegisterExperienceMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
