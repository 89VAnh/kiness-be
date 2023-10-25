"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const tsyringe_1 = require("tsyringe");
const cityRepository_1 = require("../repositories/cityRepository");
let CityService = class CityService {
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }
    async getCityDropdown() {
        return this.cityRepository.getCityDropdown();
    }
    async getCityById(id) {
        return this.cityRepository.getCityById(id);
    }
    async createCity(city) {
        return this.cityRepository.createCity(city);
    }
    async updateCity(city) {
        return this.cityRepository.updateCity(city);
    }
    async deleteCity(list_json, updated_by_id) {
        return this.cityRepository.deleteCity(list_json, updated_by_id);
    }
    async searchCity(pageIndex, pageSize, search_content, city_name, code) {
        return this.cityRepository.searchCity(pageIndex, pageSize, search_content, city_name, code);
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [cityRepository_1.CityRepository])
], CityService);
