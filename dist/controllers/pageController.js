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
exports.PageController = void 0;
const tsyringe_1 = require("tsyringe");
const pageService_1 = require("../services/pageService");
let PageController = class PageController {
    constructor(pageService) {
        this.pageService = pageService;
    }
    async getPageDropdown(_, res) {
        try {
            const data = await this.pageService.getPageDropdown();
            if (data && data.length > 0) {
                res.json(data);
            }
            else {
                res.json({ message: "Không lấy được danh sách" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async getPageById(req, res) {
        try {
            const id = req.params.id;
            const page = await this.pageService.getPageById(id);
            if (page) {
                res.json(page);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async createPage(req, res) {
        try {
            const page = req.body;
            await this.pageService.createPage(page);
            res.json({ message: "Đã thêm thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async updatePage(req, res) {
        try {
            const page = req.body;
            await this.pageService.updatePage(page);
            res.json({ message: "Đã cập nhật thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async deletePage(req, res) {
        try {
            const object = req.body;
            await this.pageService.deletePage(object.list_json, object.updated_by_id);
            res.json({ message: "Đã xóa thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async searchPage(req, res) {
        try {
            const object = req.body;
            const data = await this.pageService.searchPage(object.pageIndex, object.pageSize, object.search_content, object.page_title, object.page_code, object.content);
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
exports.PageController = PageController;
exports.PageController = PageController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [pageService_1.PageService])
], PageController);
