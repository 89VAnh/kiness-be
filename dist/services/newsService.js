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
exports.NewsService = void 0;
const tsyringe_1 = require("tsyringe");
const newsRepository_1 = require("../repositories/newsRepository");
let NewsService = class NewsService {
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    async getNewsById(id) {
        return this.newsRepository.getNewsById(id);
    }
    async createNews(news) {
        return this.newsRepository.createNews(news);
    }
    async updateNews(news) {
        return this.newsRepository.updateNews(news);
    }
    async deleteNews(list_json, updated_by_id) {
        return this.newsRepository.deleteNews(list_json, updated_by_id);
    }
    async searchNews(pageIndex, pageSize, search_content, news_title, content) {
        return this.newsRepository.searchNews(pageIndex, pageSize, search_content, news_title, content);
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [newsRepository_1.NewsRepository])
], NewsService);
