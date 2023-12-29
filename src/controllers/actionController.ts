import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Action } from "../models/action";
import { ActionService } from "../services/actionService";

@injectable()
export class ActionController {
  constructor(private actionService: ActionService) {}

  async getActionById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const action = await this.actionService.getActionById(id);
      if (action) {
        res.json(action);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createAction(req: Request, res: Response): Promise<void> {
    try {
      const action = req.body as Action;
      await this.actionService.createAction(action);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateAction(req: Request, res: Response): Promise<void> {
    try {
      const action = req.body as Action;
      await this.actionService.updateAction(action);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteAction(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.actionService.deleteAction(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchAction(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        page_index: number;
        page_size: number;
        search_content: string;
        function_id: string;
        action_code: string;
        action_name: string;
        description: string;
      };
      const data: any = await this.actionService.searchAction(
        object.page_index,
        object.page_size,
        object.search_content,
        object.function_id,
        object.action_code,
        object.action_name,
        object.description,
      );
      if (data) {
        res.json({
          total_items: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: object.page_index,
          page_size: object.page_size,
          data: data,
          pageCount: Math.ceil(
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
}
