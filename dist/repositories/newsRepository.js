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
exports.NewsRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
let NewsRepository = class NewsRepository {
    constructor(db) {
        this.db = db;
    }
    async createNews(news) {
        try {
            const sql = "CALL InsertNews(?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                news.news_title,
                news.content,
                news.content_html,
                (news.views = 0),
                news.created_by_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateNews(news) {
        try {
            const sql = "CALL UpdateNews(?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                news.news_title,
                news.content,
                news.content_html,
                news.views,
                news.lu_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteNews(list_json, updated_by_id) {
        try {
            const sql = "CALL DeleteNewsMulti(?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getNewsById(id) {
        try {
            const sql = "CALL GetNewsById(?, @err_code, @err_msg)";
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
    async searchNews(pageIndex, pageSize, search_content, news_title, content) {
        try {
            const sql = "CALL SearchNews(?, ?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                search_content,
                news_title,
                content,
            ]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.NewsRepository = NewsRepository;
exports.NewsRepository = NewsRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], NewsRepository);
