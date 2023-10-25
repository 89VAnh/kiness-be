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
exports.BranchController = void 0;
const tsyringe_1 = require("tsyringe");
const branchService_1 = require("../services/branchService");
let BranchController = class BranchController {
    constructor(branchService) {
        this.branchService = branchService;
    }
    async getBranchDropdown(req, res) {
        const city_id = req.query.city_id + "";
        try {
            const data = await this.branchService.getBranchDropdown(city_id);
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
    async getBranchById(req, res) {
        try {
            const id = req.params.id;
            const branch = await this.branchService.getBranchById(id);
            if (branch) {
                res.json(branch);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async createBranch(req, res) {
        try {
            const branch = req.body;
            await this.branchService.createBranch(branch);
            res.json({ message: "Đã thêm thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async updateBranch(req, res) {
        try {
            const branch = req.body;
            await this.branchService.updateBranch(branch);
            res.json({ message: "Đã cập nhật thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async deleteBranch(req, res) {
        try {
            const object = req.body;
            await this.branchService.deleteBranch(object.list_json, object.updated_by_id);
            res.json({ message: "Đã xóa thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async searchBranch(req, res) {
        try {
            const object = req.body;
            const data = await this.branchService.searchBranch(object.pageIndex, object.pageSize, object.search_content, object.branch_name, object.phone, object.fax, object.address);
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
    async createTestRegister(req, res) {
        try {
            const testRegister = req.body;
            await this.branchService.createTestRegister(testRegister);
            res.json({ message: "Đã thêm thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
};
exports.BranchController = BranchController;
exports.BranchController = BranchController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [branchService_1.BranchService])
], BranchController);
