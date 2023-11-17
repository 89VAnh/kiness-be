import { injectable } from "tsyringe";
import { Database } from "../config/database";

@injectable()
export class DashboardRepository {
  constructor(private db: Database) {}

  async countCustomer(user_id: string): Promise<number> {
    try {
      const sql = "CALL CountCustomer(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].TotalCustomers);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async countExperienceRegister(user_id: string): Promise<number> {
    try {
      const sql = "CALL CountExperienceRegister(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].TotalRegisters);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async countTestRegister(user_id: string): Promise<number> {
    try {
      const sql = "CALL CountTestRegister(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].TotalRegisters);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async countBranchRegister(user_id: string): Promise<number> {
    try {
      const sql = "CALL CountBranchRegister(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].TotalRegisters);
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

  async countNews(user_id: string): Promise<number> {
    try {
      const sql = "CALL CountNews(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [user_id]);
      const r = Number(results[0].total);
      return r;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
