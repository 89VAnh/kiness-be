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
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const userRepository_1 = require("../repositories/userRepository");
const tree_1 = require("../utils/tree");
const jwt_1 = require("../config/jwt");
var md5 = require('md5');
let UserService = class UserService {
    constructor(userRepository, treeUltility) {
        this.userRepository = userRepository;
        this.treeUltility = treeUltility;
    }
    async authenticate(username, password) {
        let md5_pass = md5(password);
        let user = await this.userRepository.authenticate(username, md5_pass);
        if (user) {
            let functions = await this.userRepository.getFunctionByUserId(user.user_id);
            let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
            let actions = await this.userRepository.getActionByUserId(user.user_id);
            let action_results = [];
            for (let row of actions) {
                let row_data = row;
                action_results.push(row_data.action_code);
            }
            return {
                user_id: user.user_id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                full_name: user.full_name,
                avatar: user.avatar,
                gender: user.gender,
                date_of_birth: user.date_of_birth,
                email: user.email,
                phone_number: user.phone_number,
                user_name: user.user_name,
                online_flag: user.online_flag,
                is_guest: user.is_guest,
                functions: functionTree,
                actions: action_results
            };
        }
        return null;
    }
    async authenticateEmployee(username, password) {
        let md5_pass = md5(password);
        let user = await this.userRepository.authenticateEmployee(username, md5_pass);
        if (user) {
            let functions = await this.userRepository.getFunctionByUserId(user.user_id);
            let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
            let actions = await this.userRepository.getActionByUserId(user.user_id);
            let action_results = [];
            for (let row of actions) {
                let row_data = row;
                action_results.push(row_data.action_code);
            }
            return {
                user_id: user.user_id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                full_name: user.full_name,
                avatar: user.avatar,
                gender: user.gender,
                date_of_birth: user.date_of_birth,
                email: user.email,
                phone_number: user.phone_number,
                user_name: user.user_name,
                online_flag: user.online_flag,
                is_guest: user.is_guest,
                functions: functionTree,
                actions: action_results
            };
        }
        return null;
    }
    async creatUser(user) {
        user.password = md5(user.password);
        return this.userRepository.creatUser(user);
    }
    async updateUser(user) {
        return this.userRepository.updateUser(user);
    }
    async getUserById(id) {
        return this.userRepository.getUserById(id);
    }
    async searchUser(pageIndex, pageSize, search_content, user_name, full_name, gender, date_of_birth, email, phone_number, description) {
        return this.userRepository.searchUser(pageIndex, pageSize, search_content, user_name, full_name, gender, date_of_birth, email, phone_number, description);
    }
    async deleteUser(list_json, updated_by_id) {
        return this.userRepository.deleteUser(list_json, updated_by_id);
    }
    async authorize(token) {
        let user_data = (0, jwt_1.verifyToken)(token);
        console.log(user_data);
        if (user_data == null)
            throw new Error("Phiên đăng nhập hết hạn");
        let functions = await this.userRepository.getFunctionByUserId(user_data.user_id);
        let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
        let actions = await this.userRepository.getActionByUserId(user_data.user_id);
        let action_results = [];
        for (let row of actions) {
            let row_data = row;
            action_results.push(row_data.action_code);
        }
        let data = {
            user_id: user_data.user_id,
            first_name: user_data.first_name,
            middle_name: user_data.middle_name,
            last_name: user_data.last_name,
            full_name: user_data.full_name,
            avatar: user_data.avatar,
            gender: user_data.gender,
            date_of_birth: user_data.date_of_birth,
            email: user_data.email,
            phone_number: user_data.phone_number,
            user_name: user_data.user_name,
            online_flag: user_data.online_flag,
            is_guest: user_data.is_guest,
            functions: functionTree,
            actions: action_results
        };
        return data;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [userRepository_1.UserRepository, tree_1.Tree])
], UserService);
