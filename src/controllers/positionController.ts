import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Position } from "../models/position";
import { PositionService } from "../services/positionService";

@injectable()
export class PositionController {
  constructor(private positionService: PositionService) {}

  async getPositionDropdown(_: Request, res: Response): Promise<void> {
    try {
      const data = await this.positionService.getPositionDropdown();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getPositionById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const position = await this.positionService.getPositionById(id);
      if (position) {
        res.json(position);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createPosition(req: Request, res: Response): Promise<void> {
    try {
      const position = req.body as Position;
      await this.positionService.createPosition(position);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updatePosition(req: Request, res: Response): Promise<void> {
    try {
      const position = req.body as Position;
      await this.positionService.updatePosition(position);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deletePosition(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.positionService.deletePosition(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchPosition(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        position_name: string;
        phone: string;
        fax: string;
        address: string;
      };
      const data: any = await this.positionService.searchPosition(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.position_name,
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
}
