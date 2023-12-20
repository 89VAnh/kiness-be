import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { FunctionModel } from "../models/function";
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
      const object = req.body as {
        page_index: number;
        page_size: number;
        search_content: string;
        function_id: string;
        parent_id: string;
        function_name: string;
        url: string;
        description: string;
        level: number;
      };
      const data: any = await this.funcService.searchFunction(
        object.page_index,
        object.page_size,
        object.search_content,
        object.function_id,
        object.parent_id,
        object.function_name,
        object.url,
        object.description,
        object.level,
      );
      if (data) {
        res.json({
          total_items: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: object.page_index,
          page_size: object.page_size,
          data: data,
          page_count: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.page_size ? object.page_size : 1),
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
