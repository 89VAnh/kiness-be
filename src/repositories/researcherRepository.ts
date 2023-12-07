import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Researcher } from "../models/researcher";

@injectable()
export class ResearcherRepository {
  constructor(private db: Database) {}

  async createResearcher(researcher: Researcher): Promise<any> {
    try {
      const sql =
        "CALL InsertResearcher(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";

      await this.db.query(sql, [
        researcher.name,
        researcher.position_id,
        researcher.image_url,
        researcher.story,
        researcher.paper,
        researcher.degree,
        researcher.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateResearcher(researcher: Researcher): Promise<any> {
    try {
      const sql =
        "CALL UpdateResearcher(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        researcher.researcher_id,
        researcher.name,
        researcher.position_id,
        researcher.image_url,
        researcher.story,
        researcher.paper,
        researcher.degree,
        researcher.lu_user_id,
      ]);

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteResearcher(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteResearcherMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getResearcherById(id: string): Promise<any> {
    try {
      const sql = "CALL GetResearcherById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchResearcher(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    name: string,
    position: string,
  ): Promise<any> {
    try {
      const sql = "CALL SearchResearcher(?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content,
        name,
        position,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
