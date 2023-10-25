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
exports.PageRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
let PageRepository = class PageRepository {
    constructor(db) {
        this.db = db;
    }
    async createPage(page) {
        try {
            const sql = "CALL InsertPage(?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                page.page_title,
                page.page_code,
                page.content,
                page.created_by_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updatePage(page) {
        try {
            const sql = "CALL UpdatePage(?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [page.page_title, page.page_code, page.content, page.lu_user_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deletePage(list_json, updated_by_id) {
        try {
            const sql = "CALL DeletePageMulti(?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPageById(id) {
        try {
            const sql = "CALL GetPageByCode(?, @err_code, @err_msg)";
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
    async getPageDropdown() {
        try {
            const sql = "CALL GetPageDropdown(@err_code, @err_msg)";
            const [results] = await this.db.query(sql, []);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async searchPage(pageIndex, pageSize, search_content, page_title, page_code, content) {
        try {
            const sql = "CALL SearchPage(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                search_content,
                page_title,
                page_code,
                content,
            ]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.PageRepository = PageRepository;
exports.PageRepository = PageRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], PageRepository);
