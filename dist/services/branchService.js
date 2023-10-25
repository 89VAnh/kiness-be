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
exports.BranchService = void 0;
const tsyringe_1 = require("tsyringe");
const branchRepository_1 = require("../repositories/branchRepository");
let BranchService = class BranchService {
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async getBranchDropdown(city_id) {
        return this.branchRepository.getBranchDropdown(city_id);
    }
    async getBranchById(id) {
        return this.branchRepository.getBranchById(id);
    }
    async createBranch(branch) {
        return this.branchRepository.createBranch(branch);
    }
    async updateBranch(branch) {
        return this.branchRepository.updateBranch(branch);
    }
    async deleteBranch(list_json, updated_by_id) {
        return this.branchRepository.deleteBranch(list_json, updated_by_id);
    }
    async searchBranch(pageIndex, pageSize, search_content, branch_name, phone, fax, address) {
        return this.branchRepository.searchBranch(pageIndex, pageSize, search_content, branch_name, phone, fax, address);
    }
    async createTestRegister(testRegister) {
        return this.branchRepository.createTestRegister(testRegister);
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [branchRepository_1.BranchRepository])
], BranchService);
