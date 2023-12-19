import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { HistoryModel, SearchHistoryModel } from "../models/history";
import { HistoryService } from "../services/historyService";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";

@injectable()
export class HistoryController {
  constructor(private reqService: HistoryService) {}

  async createHistory(req: Request, res: Response): Promise<any> {
    try {
      const req_model = req.body as HistoryModel;
      await this.reqService.createHistory(req_model);
      res.json({ message: "Đã tạo thành công", success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else if (error instanceof UserError) {
        res.status(400).json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }

  async updateHistory(req: Request, res: Response): Promise<any> {
    try {
      const req_model = req.body as HistoryModel;
      await this.reqService.updateHistory(req_model);
      res.json({ message: "Cập nhật thành công", success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else if (error instanceof UserError) {
        res.status(400).json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }

  async deleteHistory(req: Request, res: Response): Promise<any> {
    try {
      const r = req.body as { id: number; lu_user_id: string };
      await this.reqService.deleteHistory(r.id, r.lu_user_id);
      res.json({ message: "Xóa thành công", success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else if (error instanceof UserError) {
        res.status(400).json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }

  async getHistory(req: Request, res: Response): Promise<any> {
    try {
      const id = Number(req.params.id);
      var data = await this.reqService.getHistoryDetail(id);
      res.json({ data: data, success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else if (error instanceof UserError) {
        res.status(400).json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }

  async searchHistories(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchHistoryModel;
      var data = await this.reqService.searchHistories(object);
      if (data) {
        var results = {
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
        };
        res.json({ data: results, success: true });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm", success: false });
      }
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else if (error instanceof UserError) {
        res.status(400).json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }
}
