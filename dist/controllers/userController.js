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
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const userService_1 = require("../services/userService");
const jwt_1 = require("../config/jwt");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async isMe(_, res) {
        res.status(200).json(true);
    }
    async authenticate(req, res) {
        try {
            const { username, password } = req.body;
            const user = await this.userService.authenticate(username, password);
            if (user) {
                // Tạo mã thông báo JWT
                const token = (0, jwt_1.generateToken)(user);
                user.token = token;
                res.json(user);
            }
            else {
                res.status(401).json({ message: "Sai mật tài khoản hoặc mật khẩu" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async authenticateEmployee(req, res) {
        try {
            const { username, password } = req.body;
            const user = await this.userService.authenticateEmployee(username, password);
            if (user) {
                // Tạo mã thông báo JWT
                const token = (0, jwt_1.generateToken)(user);
                user.token = token;
                res.json(user);
            }
            else {
                res.status(401).json({ message: "Sai mật tài khoản hoặc mật khẩu" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const role = await this.userService.getUserById(id);
            if (role) {
                res.json(role);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async createUser(req, res) {
        try {
            const role = req.body;
            await this.userService.creatUser(role);
            res.json({ message: "Đã thêm thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async updateUser(req, res) {
        try {
            const role = req.body;
            await this.userService.updateUser(role);
            res.json({ message: "Đã cập nhật thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async deleteUser(req, res) {
        try {
            const object = req.body;
            await this.userService.deleteUser(object.list_json, object.updated_by_id);
            res.json({ message: "Đã xóa thành công", results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async searchUser(req, res) {
        try {
            const object = req.body;
            const data = await this.userService.searchUser(object.pageIndex, object.pageSize, object.search_content, object.user_name, object.full_name, object.gender, object.date_of_birth, object.email, object.phone_number, object.description);
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
    async authorize(req, res) {
        try {
            let token = req.params.token;
            let result = await this.userService.authorize(token);
            if (result) {
                res.json(result);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" });
            }
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [userService_1.UserService])
], UserController);
