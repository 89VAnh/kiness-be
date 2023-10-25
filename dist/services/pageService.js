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
exports.PageService = void 0;
const tsyringe_1 = require("tsyringe");
const pageRepository_1 = require("../repositories/pageRepository");
let PageService = class PageService {
    constructor(pageRepository) {
        this.pageRepository = pageRepository;
    }
    async getPageDropdown() {
        return this.pageRepository.getPageDropdown();
    }
    async getPageById(id) {
        return this.pageRepository.getPageById(id);
    }
    async createPage(page) {
        return this.pageRepository.createPage(page);
    }
    async updatePage(page) {
        return this.pageRepository.updatePage(page);
    }
    async deletePage(list_json, updated_by_id) {
        return this.pageRepository.deletePage(list_json, updated_by_id);
    }
    async searchPage(pageIndex, pageSize, search_content, page_title, page_code, content) {
        return this.pageRepository.searchPage(pageIndex, pageSize, search_content, page_title, page_code, content);
    }
};
exports.PageService = PageService;
exports.PageService = PageService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [pageRepository_1.PageRepository])
], PageService);
