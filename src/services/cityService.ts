import { injectable } from "tsyringe";
import { City, SearchCity } from "../models/city";
import { CityRepository } from "../repositories/cityRepository";

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
  async searchCity(search: SearchCity): Promise<City> {
    return this.cityRepository.searchCity(search);
  }
}
