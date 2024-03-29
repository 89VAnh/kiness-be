import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { RoleFuntionService } from "../services/roleFunctionService";
@injectable()
export class RoleFunctionController {
  constructor(private rfService: RoleFuntionService) {}

  async createRoleFunction(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as {
        role_function_list: any;
        created_by_user_id: string;
      };
      await this.rfService.createRoleFunction(
        role.role_function_list,
        role.created_by_user_id,
      );
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteRoleFunction(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.rfService.deleteRoleFunction(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }
}
