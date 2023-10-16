import { injectable } from "tsyringe";
import { CityRepository } from "../repositories/cityRepository";
import { City } from "../models/city";

@injectable()
export class CityService {
  constructor(private cityRepository: CityRepository) {}

  async getCityDropdown(): Promise<any> {
    return this.cityRepository.getCityDropdown();
  }

  async getCityById(id: string): Promise<any> {
    return this.cityRepository.getCityById(id);
  }

  async createCity(city: City): Promise<any> {
    return this.cityRepository.createCity(city);
  }

  async updateCity(city: City): Promise<any> {
    return this.cityRepository.updateCity(city);
  }

  async deleteCity(list_json: any, updated_by_id: string): Promise<any> {
    return this.cityRepository.deleteCity(list_json, updated_by_id);
  }
  async searchCity(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    city_name: string,
    code: string,
  ): Promise<City> {
    return this.cityRepository.searchCity(
      pageIndex,
      pageSize,
      search_content,
      city_name,
      code,
    );
  }
}
