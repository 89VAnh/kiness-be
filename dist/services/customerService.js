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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const tsyringe_1 = require("tsyringe");
const customerRepository_1 = require("../repositories/customerRepository");
const guid_service_1 = require("../utils/guid.service");
const ts_md5_1 = require("ts-md5");
const nodemailer_1 = __importDefault(require("nodemailer"));
const system_email_1 = require("../config/system_email");
let CustomerService = class CustomerService {
    constructor(customerRepository, guid) {
        this.customerRepository = customerRepository;
        this.guid = guid;
    }
    async getCustomerDropdown() {
        return this.customerRepository.getCustomerDropdown();
    }
    async getCustomerById(id) {
        return this.customerRepository.getCustomerById(id);
    }
    async createCustomer(customer) {
        customer.user_id = this.guid.newGuid();
        customer.profile_id = this.guid.newGuid();
        customer.password = ts_md5_1.Md5.hashStr(customer.password);
        return this.customerRepository.createCustomer(customer);
    }
    async updateCustomer(customer) {
        // customer.password = Md5.hashStr(customer.password);
        return customer;
        // return this.customerRepository.updateCustomer(customer);
    }
    async deleteCustomer(list_json, updated_by_id) {
        return this.customerRepository.deleteCustomer(list_json, updated_by_id);
    }
    async searchCustomer(pageIndex, pageSize, user_id, search_content, customer_id, customer_name, phone_number, email, position_id, department_id) {
        let list = await this.customerRepository.searchCustomer(pageIndex, pageSize, user_id, search_content, customer_id, customer_name, phone_number, email, position_id, department_id);
        for (let x of list) {
            if (x.customer_customer) {
                x.customer_customer = JSON.parse(x.customer_customer);
            }
        }
        return list;
    }
    async changePassword(user_id, old_password, new_password, lu_user_id) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (old_password == null)
            throw new Error("Mật khẩu hiện tại không thể để trống");
        if (new_password == null)
            throw new Error("Mật khẩu mới không thể để trống");
        if (lu_user_id == null)
            throw new Error("lu_user_id không thể để trống");
        const isValidPassword = passwordRegex.test(new_password);
        if (!isValidPassword)
            throw Error("Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ hoa, chữ thường, và ít nhất một kí tự đặc biệt và số");
        old_password = ts_md5_1.Md5.hashStr(old_password);
        new_password = ts_md5_1.Md5.hashStr(new_password);
        return this.customerRepository.changePassword(user_id, old_password, new_password, lu_user_id);
    }
    async resetPassword(user_name, email) {
        const generateRandomString = (length) => {
            let result = "";
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        var new_password = generateRandomString(8);
        var hashed_password = ts_md5_1.Md5.hashStr(new_password);
        let result = await this.customerRepository.resetPassword(user_name, email, hashed_password);
        if (result) {
            let mailTransporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: system_email_1.system_email.email,
                    pass: system_email_1.system_email.password,
                },
            });
            const emailBody = `
                      <p>Xin chào,</p>

                      <p>Hệ thống đã nhận được yêu cầu đổi mật từ bạn.</p>

                      <p>Mật khẩu mới của bạn là: <b> ${new_password}</b></p>
                      <p>Trân trọng.
`;
            var mailOptions = {
                from: system_email_1.system_email.email,
                to: email,
                subject: "Đổi mật khẩu",
                html: emailBody,
            };
            mailTransporter.sendMail(mailOptions, function (err) {
                if (err)
                    console.log(err);
            });
        }
    }
    async resetPasswordByAdmin(user_id, lu_user_id) {
        const generateRandomString = (length) => {
            let result = "";
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        var new_password = generateRandomString(8);
        var hashed_password = ts_md5_1.Md5.hashStr(new_password);
        let email = await this.customerRepository.resetPasswordByAdmin(user_id, hashed_password, lu_user_id);
        if (email) {
            let mailTransporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: system_email_1.system_email.email,
                    pass: system_email_1.system_email.password,
                },
            });
            const emailBody = `
                      <p>Xin chào,</p>

                      <p>Hệ thống đã nhận được yêu cầu đổi mật từ bạn.</p>

                      <p>Mật khẩu mới của bạn là: <b> ${new_password}</b></p>
                      <p>Trân trọng.
`;
            var mailOptions = {
                from: system_email_1.system_email.email,
                to: email,
                subject: "Đổi mật khẩu",
                html: emailBody,
            };
            mailTransporter.sendMail(mailOptions, function (err) {
                if (err)
                    console.log(err);
            });
        }
        return new_password;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [customerRepository_1.CustomerRepository,
        guid_service_1.Guid])
], CustomerService);
