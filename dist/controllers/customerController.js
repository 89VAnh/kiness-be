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
exports.CustomerController = void 0;
const tsyringe_1 = require("tsyringe");
const customerService_1 = require("../services/customerService");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getCustomerDropdown(_, res) {
        try {
            const data = await this.customerService.getCustomerDropdown();
            if (data && data.length > 0) {
                res.json(data);
            }
            else {
                res.json({ message: 'Không lấy được danh sách' });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async getCustomerById(req, res) {
        try {
            const id = req.params.id;
            const data = await this.customerService.getCustomerById(id);
            if (data && data.length > 0) {
                let customer = data[0][0];
                if (customer) {
                    customer.customer_customer = data[1];
                    res.json(customer);
                }
                else {
                    res.json({ message: 'Bản ghi không tồn tại' });
                }
            }
            else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async createCustomer(req, res) {
        try {
            const customer = req.body;
            const result = await this.customerService.createCustomer(customer);
            console.log(result);
            res.json({ message: 'Đã thêm thành công', results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async updateCustomer(req, res) {
        try {
            const customer = req.body;
            await this.customerService.updateCustomer(customer);
            res.json({ message: 'Đã cập nhật thành công', results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async deleteCustomer(req, res) {
        try {
            const object = req.body;
            await this.customerService.deleteCustomer(object.list_json, object.updated_by_id);
            res.json({ message: 'Đã xóa thành công', results: true });
        }
        catch (error) {
            res.json({ message: error.message, results: false });
        }
    }
    async searchCustomer(req, res) {
        try {
            const object = req.body;
            const data = await this.customerService.searchCustomer(object.pageIndex, object.pageSize, object.user_id, object.search_content, object.customer_id, object.fullname, object.phone_number, object.email, object.position_id, object.department_id);
            if (data) {
                res.json({
                    totalItems: Math.ceil(data && data.length > 0 ? data[0].RecordCount : 0),
                    page: object.pageIndex,
                    pageSize: object.pageSize,
                    data: data,
                    pageCount: Math.ceil((data && data.length > 0 ? data[0].RecordCount : 0) / (object.pageSize ? object.pageSize : 1))
                });
            }
            else {
                res.json({ message: 'Không tồn tại kết quả tìm kiếm' });
            }
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async changePassword(req, res) {
        try {
            var user_id = req.body.user_id;
            var old_password = req.body.old_password;
            var new_password = req.body.new_password;
            var lu_user_id = req.body.lu_user_id;
            await this.customerService.changePassword(user_id, old_password, new_password, lu_user_id);
            res.json({ message: "Đổi mật khẩu thành công", success: true });
        }
        catch (error) {
            res.json({ message: error.message, success: false });
        }
    }
    async resetPassword(req, res) {
        try {
            var user_name = req.body.user_name;
            var email = req.body.email;
            await this.customerService.resetPassword(user_name, email);
            res.json({ message: "Đổi mật khẩu thành công", success: true });
        }
        catch (error) {
            res.json({ message: error.message, success: false });
        }
    }
    async resetPasswordByAdmin(req, res) {
        try {
            var user_id = req.body.user_id;
            var lu_user_id = req.body.lu_user_id;
            var new_password = await this.customerService.resetPasswordByAdmin(user_id, lu_user_id);
            res.json({ message: `Đổi mật khẩu thành công. Mật khẩu mới là ${new_password}`, success: true, password: new_password });
        }
        catch (error) {
            res.json({ message: error.message, success: false });
        }
    }
};
exports.CustomerController = CustomerController;
exports.CustomerController = CustomerController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [customerService_1.CustomerService])
], CustomerController);
