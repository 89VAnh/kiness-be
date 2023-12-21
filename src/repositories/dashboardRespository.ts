import { injectable } from "tsyringe";
import { Database } from "../config/database";

@injectable()
export class DashboardRepository {
  constructor(private db: Database) {}

  async countExperienceRegister(user_id: string): Promise<any> {
    try {
      const sql = "CALL CountExperienceRegister(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].total);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async countEmployee(user_id: string): Promise<number> {
    try {
      const sql = "CALL CountEmployee(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].total);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async countBranch(user_id: string): Promise<number> {
    try {
      const sql = "CALL CountBranch(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].total);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async countRequest(): Promise<number> {
    try {
      const sql = "CALL CountRequest(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      const r = Number(results[0].total);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
