import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Branch, SearchBranch } from "../models/branch";
import { BranchService } from "../services/branchService";

@injectable()
export class BranchController {
  constructor(private branchService: BranchService) {}

  async getBranchDropdown(req: Request, res: Response): Promise<void> {
    const city_id = req.query.city_id + "";
    try {
      const data = await this.branchService.getBranchDropdown(city_id);
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách " });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getBranchById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const branch = await this.branchService.getBranchById(id);
      if (branch) {
        res.json(branch);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createBranch(req: Request, res: Response): Promise<void> {
    try {
      const branch = req.body as Branch;
      await this.branchService.createBranch(branch);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateBranch(req: Request, res: Response): Promise<void> {
    try {
      const branch = req.body as Branch;
      await this.branchService.updateBranch(branch);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteBranch(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; lu_user_id: string };
      await this.branchService.deleteBranch(
        object.list_json,
        object.lu_user_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchBranch(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as SearchBranch;
      const data: any = await this.branchService.searchBranch(object);
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
}
