import nodemailer from "nodemailer";
import { Md5 } from "ts-md5";
import { injectable } from "tsyringe";
import { system_email } from "../config/system_email";
import { Customer } from "../models/customer";
import { CustomerRepository } from "../repositories/customerRepository";
import { Guid } from "../utils/guid.service";
@injectable()
export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private guid: Guid,
  ) {}

  async getCustomerDropdown(): Promise<any> {
    return this.customerRepository.getCustomerDropdown();
  }

  async getCustomerById(id: string): Promise<any> {
    return this.customerRepository.getCustomerById(id);
  }

  async createCustomer(customer: Customer): Promise<any> {
    customer.user_id = this.guid.newGuid();
    customer.profile_id = this.guid.newGuid();
    customer.user_role_id = this.guid.newGuid();
    customer.role_id = customer.role_id || 2 + "";
    customer.password = Md5.hashStr(customer.password);
    return this.customerRepository.createCustomer(customer);
  }

  async updateCustomer(customer: Customer): Promise<any> {
    // customer.password = Md5.hashStr(customer.password);
    // return customer;
    return this.customerRepository.updateCustomer(customer);
  }

  async deleteCustomer(list_json: any, lu_user_id: string): Promise<any> {
    return this.customerRepository.deleteCustomer(list_json, lu_user_id);
  }

  async searchCustomer(
    page_index: number,
    page_size: number,
    user_id: string,
    search_content: string,
    customer_id: string,
    customer_name: string,
    phone_number: string,
    email: string,
  ) {
    let list = await this.customerRepository.searchCustomer(
      page_index,
      page_size,
      user_id,
      search_content,
      customer_id,
      customer_name,
      phone_number,
      email,
    );
    for (let x of list) {
      if (x.customer_customer) {
        x.customer_customer = JSON.parse(x.customer_customer);
      }
    }
    return list;
  }

  async changePassword(
    user_id: string,
    old_password: string,
    new_password: string,
    lu_user_id: string,
  ) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (old_password == null)
      throw new Error("Mật khẩu hiện tại không thể để trống");
    if (new_password == null)
      throw new Error("Mật khẩu mới không thể để trống");
    if (lu_user_id == null) throw new Error("lu_user_id không thể để trống");
    const isValidPassword = passwordRegex.test(new_password);
    if (!isValidPassword)
      throw Error(
        "Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ hoa, chữ thường, và ít nhất một kí tự đặc biệt và số",
      );
    old_password = Md5.hashStr(old_password);
    new_password = Md5.hashStr(new_password);
    return this.customerRepository.changePassword(
      user_id,
      old_password,
      new_password,
      lu_user_id,
    );
  }

  async resetPassword(user_name: string, email: string) {
    const generateRandomString = (length: number) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };
    var new_password = generateRandomString(8);
    var hashed_password = Md5.hashStr(new_password);
    let result = await this.customerRepository.resetPassword(
      user_name,
      email,
      hashed_password,
    );
    if (result) {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: system_email.email,
          pass: system_email.password,
        },
      });

      const emailBody = `
                      <p>Xin chào,</p>

                      <p>Hệ thống đã nhận được yêu cầu đổi mật từ bạn.</p>

                      <p>Mật khẩu mới của bạn là: <b> ${new_password}</b></p>
                      <p>Trân trọng.
`;

      var mailOptions = {
        from: system_email.email,
        to: email,
        subject: "Đổi mật khẩu",
        html: emailBody,
      };

      mailTransporter.sendMail(mailOptions, function (err: any) {
        if (err) console.log(err);
      });
    }
  }

  async resetPasswordByAdmin(user_id: string, lu_user_id: string) {
    const generateRandomString = (length: number) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };
    var new_password = generateRandomString(8);
    var hashed_password = Md5.hashStr(new_password);
    let email = await this.customerRepository.resetPasswordByAdmin(
      user_id,
      hashed_password,
      lu_user_id,
    );
    if (email) {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: system_email.email,
          pass: system_email.password,
        },
      });

      const emailBody = `
                      <p>Xin chào,</p>

                      <p>Hệ thống đã nhận được yêu cầu đổi mật từ bạn.</p>

                      <p>Mật khẩu mới của bạn là: <b> ${new_password}</b></p>
                      <p>Trân trọng.
`;

      var mailOptions = {
        from: system_email.email,
        to: email,
        subject: "Đổi mật khẩu",
        html: emailBody,
      };

      mailTransporter.sendMail(mailOptions, function (err: any) {
        if (err) console.log(err);
      });
    }
    return new_password;
  }
}
