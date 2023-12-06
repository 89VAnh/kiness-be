import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { City, SearchCity } from "../models/city";

@injectable()
export class CityRepository {
  constructor(private db: Database) {}

  async createCity(city: City): Promise<any> {
    try {
      const sql = "CALL InsertCity(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        city.city_name,
        city.code,
        city.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateCity(city: City): Promise<any> {
    try {
      const sql = "CALL UpdateCity(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        city.city_id,
        city.city_name,
        city.code,
        city.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteCity(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteCityMulti(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getCityById(id: string): Promise<any> {
    try {
      const sql = "CALL GetCityById(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getCityDropdown(): Promise<any> {
    try {
      const sql = "CALL GetCityDropdown(@err_code, @err_msg)";
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchCity(search: SearchCity): Promise<any> {
    try {
      const sql = "CALL SearchCity(?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search.pageIndex,
        search.pageSize,
        search.search_content,
        search.city_name,
        search.code,
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
