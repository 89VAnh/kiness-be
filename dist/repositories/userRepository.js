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
exports.UserRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
let UserRepository = class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async authenticate(username, password) {
        try {
            const sql = "CALL GetCustomerByAccount(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [username]);
            if (Array.isArray(results) && results.length > 0) {
                let user = results[0];
                if (user.password == password) {
                    return user;
                }
                else {
                    return null;
                }
                // return {username: user.customer_name,fullname: user.customer_name};
            }
            return null;
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
    async authenticateEmployee(username, password) {
        try {
            const sql = "CALL GetUserByAccount(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [username]);
            console.log(results);
            if (Array.isArray(results) && results.length > 0) {
                let user = results[0];
                if (user.password == password) {
                    return user;
                }
                else {
                    return null;
                }
                // return {username: user.customer_name,fullname: user.customer_name};
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async creatUser(user) {
        try {
            const sql = "CALL InsertUser(?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?,@err_code, @err_msg)";
            await this.db.query(sql, [
                user.user_id,
                user.profile_id,
                user.user_name,
                user.password,
                user.type,
                user.description,
                user.first_name,
                user.middle_name,
                user.last_name,
                user.full_name,
                user.avatar,
                user.gender,
                user.date_of_birth,
                user.email,
                user.phone_number,
                user.is_guest,
                user.created_by_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateUser(user) {
        try {
            const sql = "CALL UpdateUser(?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                user.profile_id,
                user.user_id,
                user.type,
                user.description,
                user.first_name,
                user.middle_name,
                user.last_name,
                user.full_name,
                user.avatar,
                user.gender,
                user.date_of_birth,
                user.email,
                user.phone_number,
                user.lu_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteUser(list_json, updated_by_id) {
        try {
            const sql = "CALL DeleteUser(?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getUserById(id) {
        try {
            const sql = "CALL GetUserById(?, @err_code, @err_msg)";
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
    async getFunctionByUserId(id) {
        try {
            const sql = "CALL GetFunctionByUserId(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [id]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getActionByUserId(id) {
        try {
            const sql = "CALL GetActionByUserId(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [id]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async searchUser(pageIndex, pageSize, search_content, user_name, full_name, gender, date_of_birth, email, phone_number, description) {
        try {
            const sql = "CALL SearchUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                search_content,
                user_name,
                description,
                full_name,
                gender,
                date_of_birth,
                email,
                phone_number,
            ]);
            console.log(results);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], UserRepository);
