import nodemailer from "nodemailer";
import { Md5 } from "ts-md5";
import { injectable } from "tsyringe";
import { system_email } from "../config/system_email";
import { Employee } from "../models/employee";
import { EmployeeRepository } from "../repositories/employeeRepository";
import { Guid } from "../utils/guid.service";
@injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private guid: Guid,
  ) {}

  async getEmployeeDropdown(): Promise<any> {
    return this.employeeRepository.getEmployeeDropdown();
  }

  async getEmployeeById(id: string): Promise<any> {
    return this.employeeRepository.getEmployeeById(id);
  }

  async createEmployee(employee: Employee): Promise<any> {
    employee.user_id = this.guid.newGuid();
    employee.profile_id = this.guid.newGuid();
    employee.user_role_id = this.guid.newGuid();
    employee.role_id = employee.role_id || 1 + "";
    employee.password = Md5.hashStr(employee.password || "123456");
    return this.employeeRepository.createEmployee(employee);
  }

  async updateEmployee(employee: Employee): Promise<any> {
    // employee.password = Md5.hashStr(employee.password);
    return this.employeeRepository.updateEmployee(employee);
  }

  async deleteEmployee(list_json: any, updated_by_id: string): Promise<any> {
    return this.employeeRepository.deleteEmployee(list_json, updated_by_id);
  }
  async searchEmployee(
    page_index: number,
    page_size: number,
    user_id: string,
    search_content: string,
    employee_id: string,
    fullname: string,
    phone_number: string,
    email: string,
    position_id: number,
  ) {
    let list = await this.employeeRepository.searchEmployee(
      page_index,
      page_size,
      user_id,
      search_content,
      employee_id,
      fullname,
      phone_number,
      email,
      position_id,
    );
    for (let x of list) {
      if (x.employee_customer) {
        x.employee_customer = JSON.parse(x.employee_customer);
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
    return this.employeeRepository.changePassword(
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
    let result = await this.employeeRepository.resetPassword(
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
                      <p>Trân trọng.</p>
`;

      var mailOptions = {
        from: system_email.email,
        to: email,
        subject: "Đổi mật khẩu",
        html: emailBody,
      };

      mailTransporter.sendMail(mailOptions, function (err) {
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
    let email = await this.employeeRepository.resetPasswordByAdmin(
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

      mailTransporter.sendMail(mailOptions, function (err) {
        if (err) console.log(err);
      });
    }
    return new_password;
  }
}
