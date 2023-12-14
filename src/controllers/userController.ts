import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { UserService } from "../services/userService";
import { User } from "../models/user";
import { generateToken } from "../config/jwt";
@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  async isMe(_: Request, res: Response): Promise<void> {
    res.status(200).json(true);
  }

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await this.userService.authenticate(username, password);
      if (user) {
        // Tạo mã thông báo JWT
        const token = generateToken(user);
        user.token = token;
        res.json(user);
      } else {
        res.status(401).json({ message: "Sai mật tài khoản hoặc mật khẩu" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async authenticateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await this.userService.authenticateEmployee(
        username,
        password,
      );
      if (user) {
        // Tạo mã thông báo JWT
        const token = generateToken(user);
        user.token = token;
        res.json(user);
      } else {
        res.status(401).json({ message: "Sai mật tài khoản hoặc mật khẩu" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const role = await this.userService.getUserById(id);
      if (role) {
        res.json(role);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as User;
      await this.userService.createUser(role);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as User;
      await this.userService.updateUser(role);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as User;
      const results = await this.userService.resetPassword(role);
      res.json({ message: "Đã cập nhật thành công", results });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body;
      const results = await this.userService.changePassword(role);
      res.json({ message: "Đã cập nhật thành công", results });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.userService.deleteUser(object.list_json, object.updated_by_id);
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        user_name: string;
        full_name: string;
        gender: number;
        date_of_birth: Date;
        email: string;
        phone_number: string;
        description: string;
      };
      const data: any = await this.userService.searchUser(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.user_name,
        object.full_name,
        object.gender,
        object.date_of_birth,
        object.email,
        object.phone_number,
        object.description,
      );
      if (data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.pageSize ? object.pageSize : 1),
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async authorize(req: Request, res: Response): Promise<void> {
    try {
      let token = req.params.token;
      let result = await this.userService.authorize(token);
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }
}
