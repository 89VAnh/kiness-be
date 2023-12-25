import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { FunctionModel, SearchFunctionsModel } from "../models/function";
import { FunctionService } from "../services/functionService";

@injectable()
export class FunctionController {
  constructor(private funcService: FunctionService) {}

  async getFunctionById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const customer = await this.funcService.getFunctionById(id);
      if (customer) {
        res.json(customer);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createFUnction(req: Request, res: Response): Promise<void> {
    try {
      const func = req.body as FunctionModel;
      await this.funcService.createFunction(func);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateFunction(req: Request, res: Response): Promise<void> {
    try {
      const func = req.body as FunctionModel;
      await this.funcService.updateFunction(func);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteFunction(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; lu_user_id: string };
      await this.funcService.deleteFunction(
        object.list_json,
        object.lu_user_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchFunction(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchFunctionsModel;
      const data: any = await this.funcService.searchFunction(object);
      if (data) {
        res.json({
          total_items: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: 0,
          page_size: 0,
          data: data,
          page_count: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getByRole(req: Request, res: Response): Promise<any> {
    try {
      const role_id = req.params.id;
      const data: any = await this.funcService.getFunctionByRole(role_id);
      if (data) {
        res.json(data);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
}
