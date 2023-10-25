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
exports.BranchRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
let BranchRepository = class BranchRepository {
    constructor(db) {
        this.db = db;
    }
    async createBranch(branch) {
        try {
            const sql = "CALL InsertBranch(?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                branch.branch_name,
                branch.phone,
                branch.fax,
                branch.address,
                branch.created_by_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateBranch(branch) {
        try {
            const sql = "CALL UpdateBranch(?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                branch.branch_name,
                branch.phone,
                branch.fax,
                branch.address,
                branch.lu_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteBranch(list_json, updated_by_id) {
        try {
            const sql = "CALL DeleteBranchMulti(?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getBranchById(id) {
        try {
            const sql = "CALL GetBranchById(?, @err_code, @err_msg)";
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
    async getBranchDropdown(city_id) {
        try {
            const sql = "CALL GetBranchDropdown(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [city_id]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async searchBranch(pageIndex, pageSize, search_content, branch_name, phone, fax, address) {
        try {
            const sql = "CALL SearchBranch(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                search_content,
                branch_name,
                phone,
                fax,
                address,
            ]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createTestRegister(testRegister) {
        try {
            const sql = "CALL InsertTestRegister(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                testRegister.branch_id,
                testRegister.fullname,
                testRegister.gender,
                testRegister.level,
                testRegister.date,
                testRegister.phone_number,
                testRegister.address,
                testRegister.detail,
                testRegister.created_by_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.BranchRepository = BranchRepository;
exports.BranchRepository = BranchRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], BranchRepository);
