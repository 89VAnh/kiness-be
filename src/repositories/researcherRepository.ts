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

  async deleteResearcher(list_json: any, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteResearcherMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), lu_user_id]);
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

  async getResearcherDropdown(): Promise<any> {
    try {
      const sql = "CALL GetResearcherDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchResearcher(
    page_index: number,
    page_size: number,
    search_content: string,
    researcher_name: string,
    position: string,
  ): Promise<any> {
    try {
      const sql = "CALL SearchResearchers(?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        page_index,
        page_size,
        search_content,
        researcher_name,
        position,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
