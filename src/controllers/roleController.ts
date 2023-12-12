import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Role, SearchRole } from "../models/role";
import { RoleService } from "../services/roleService";

@injectable()
export class RoleController {
  constructor(private roleService: RoleService) {}

  async getRoleDropdown(_: Request, res: Response): Promise<void> {
    try {
      const data = await this.roleService.getRoleDropdown();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const role = await this.roleService.getRoleById(id);
      if (role) {
        res.json(role);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as Role;
      await this.roleService.createRole(role);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as Role;
      await this.roleService.updateRole(role);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.roleService.deleteRole(object.list_json, object.updated_by_id);
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchRole(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as SearchRole;
      const data: any = await this.roleService.searchRole(object);
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
}
