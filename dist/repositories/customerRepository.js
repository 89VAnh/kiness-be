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
exports.CustomerRepository = void 0;
const tsyringe_1 = require("tsyringe");
const database_1 = require("../config/database");
let CustomerRepository = class CustomerRepository {
    constructor(db) {
        this.db = db;
    }
    async createCustomer(customer) {
        try {
            const sql = "CALL InsertCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                customer.branch_id,
                customer.customer_id,
                customer.customer_name,
                customer.phone_number,
                customer.email,
                customer.address,
                customer.password,
                customer.user_id,
                customer.type,
                customer.description,
                customer.is_guest,
                customer.profile_id,
                customer.first_name,
                customer.middle_name,
                customer.last_name,
                customer.avatar,
                customer.gender,
                customer.birthday,
                customer.customer_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    // async updateCustomer(customer: Customer): Promise<any> {
    //   try {
    //     const sql =
    //       "CALL UpdateCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
    //     // await this.db.query(sql, [
    //     //   customer.branch_id,
    //     //   customer.customer_id,
    //     //   customer.fullname,
    //     //   customer.phone_number,
    //     //   customer.email,
    //     //   customer.position_id,
    //     //   customer.department_id,
    //     //   customer.password,
    //     //   JSON.stringify(customer.list_json_customer_customer),
    //     //   customer.type,
    //     //   customer.description,
    //     //   customer.is_guest,
    //     //   customer.first_name,
    //     //   customer.middle_name,
    //     //   customer.last_name,
    //     //   customer.avatar,
    //     //   customer.gender,
    //     //   customer.date_of_birth,
    //     //   customer.role_id,
    //     //   customer.lu_user_id,
    //     // ]);
    //     return true;
    //   } catch (error: any) {
    //     throw new Error(error.message);
    //   }
    // }
    async deleteCustomer(list_json, updated_by_id) {
        try {
            const sql = "CALL DeleteCustomerMulti(?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getCustomerById(id) {
        try {
            const sql = "CALL GetCustomerById(?, @err_code, @err_msg)";
            const results = await this.db.queryList(sql, [id]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getCustomerDropdown() {
        try {
            const sql = "CALL GetCustomerDropdown(@err_code, @err_msg)";
            const [results] = await this.db.query(sql, []);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async searchCustomer(pageIndex, pageSize, user_id, search_content, customer_id, fullname, phone_number, email, position_id, department_id) {
        try {
            const sql = "CALL SearchCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                user_id,
                search_content,
                customer_id,
                fullname,
                phone_number,
                email,
                position_id,
                department_id,
            ]);
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async changePassword(user_id, old_password, new_password, lu_user_id) {
        try {
            const sql = "CALL ChangePassword(?, ?, ?, ?,@err_code, @err_msg)";
            await this.db.query(sql, [
                user_id,
                old_password,
                new_password,
                lu_user_id,
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async resetPassword(user_name, email, new_password) {
        try {
            const sql = "CALL ResetPassword(?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [user_name, email, new_password]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async resetPasswordByAdmin(user_id, new_password, lu_user_id) {
        try {
            const sql = "CALL ResetPasswordByAdmin(?, ?, ?, @err_code, @err_msg)";
            var [result] = await this.db.query(sql, [
                user_id,
                new_password,
                lu_user_id,
            ]);
            if (result.length > 0) {
                var email = result[0].email;
            }
            else
                throw new Error("Không tồn tại email");
            return email;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.CustomerRepository = CustomerRepository;
exports.CustomerRepository = CustomerRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], CustomerRepository);
