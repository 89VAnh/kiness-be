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
exports.CityRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
let CityRepository = class CityRepository {
    constructor(db) {
        this.db = db;
    }
    async createCity(city) {
        try {
            const sql = "CALL InsertCity(?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                city.city_name,
                city.code,
                city.created_by_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateCity(city) {
        try {
            const sql = "CALL UpdateCity(?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [city.city_name, city.code, city.lu_user_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteCity(list_json, updated_by_id) {
        try {
            const sql = "CALL DeleteCityMulti(?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getCityById(id) {
        try {
            const sql = "CALL GetCityById(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getCityDropdown() {
        try {
            const sql = "CALL GetCityDropdown(@err_code, @err_msg)";
            const [results] = await this.db.query(sql, []);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async searchCity(pageIndex, pageSize, search_content, city_name, code) {
        try {
            const sql = "CALL SearchCity(?, ?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                search_content,
                city_name,
                code,
            ]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.CityRepository = CityRepository;
exports.CityRepository = CityRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], CityRepository);
