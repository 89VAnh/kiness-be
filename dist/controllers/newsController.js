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
exports.NewsController = void 0;
const tsyringe_1 = require("tsyringe");
const newsService_1 = require("../services/newsService");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async getNewsById(req, res) {
        try {
            const id = req.params.id;
            const news = await this.newsService.getNewsById(id);
            if (news) {
                res.json(news);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async createNews(req, res) {
        try {
            const news = req.body;
            await this.newsService.createNews(news);
            res.json({ message: "Đã thêm thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async updateNews(req, res) {
        try {
            const news = req.body;
            await this.newsService.updateNews(news);
            res.json({ message: "Đã cập nhật thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async deleteNews(req, res) {
        try {
            const object = req.body;
            await this.newsService.deleteNews(object.list_json, object.updated_by_id);
            res.json({ message: "Đã xóa thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async searchNews(req, res) {
        try {
            const object = req.body;
            const data = await this.newsService.searchNews(object.pageIndex, object.pageSize, object.search_content, object.news_title, object.content);
            if (data) {
                res.json({
                    totalItems: Math.ceil(data && data.length > 0 ? data[0].RecordCount : 0),
                    page: object.pageIndex,
                    pageSize: object.pageSize,
                    data: data,
                    pageCount: Math.ceil((data && data.length > 0 ? data[0].RecordCount : 0) /
                        (object.pageSize ? object.pageSize : 1)),
                });
            }
            else {
                res.json({ message: "Không tồn tại kết quả tìm kiếm" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
};
exports.NewsController = NewsController;
exports.NewsController = NewsController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [newsService_1.NewsService])
], NewsController);
