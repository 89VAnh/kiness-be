import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  BranchRegister,
  SearchBranchRegister,
} from "../models/branch-register";
import { BranchRegisterService } from "../services/branchRegisterService";

@injectable()
export class BranchRegisterController {
  constructor(private branchService: BranchRegisterService) {}

  async createBranchRegister(req: Request, res: Response): Promise<void> {
    try {
      const branchRegister = req.body as BranchRegister;
      await this.branchService.createBranchRegister(branchRegister);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  // async updateBranchRegister(req: Request, res: Response): Promise<void> {
  //   try {
  //     const branchRegister = req.body as BranchRegister;
  //     await this.branchService.updateBranchRegister(branchRegister);
  //     res.json({ message: "Đã sửa thành công", results: true });
  //   } catch (error: any) {
  //     res.json({ message: error.message, results: false });
  //   }
  // }

  // async updateBranchRegisterStatus(req: Request, res: Response): Promise<void> {
  //   try {
  //     const branchRegister = req.body as BranchRegister;
  //     await this.branchService.updateBranchRegisterStatus(branchRegister);
  //     res.json({ message: "Đã thay đổi trạng thái thành công", results: true });
  //   } catch (error: any) {
  //     res.json({ message: error.message, results: false });
  //   }
  // }

  async searchBranchRegister(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchBranchRegister;
      const data: any = await this.branchService.searchBranchRegister(object);
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

  async deleteBranchRegister(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.branchService.deleteBranchRegister(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  // async printBranchRegister(req: Request, res: Response): Promise<any> {
  //   try {
  //     const object = req.body as {
  //       search_content: string;
  //       branch_name: string;
  //       phone: string;
  //       address: string;
  //       from_date: Date;
  //       to_date: Date;
  //     };
  //     const buffer: any = await this.branchService.printBranchRegister(
  //       object.search_content,
  //       object.branch_name,
  //       object.phone,
  //       object.address,
  //       object.from_date,
  //       object.to_date,
  //     );
  //     if (buffer) {
  //       res.setHeader(
  //         "Content-Type",
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //       );

  //       const filename = "Danh sách đơn đăng ký trải nghiệm";
  //       res.setHeader(
  //         "Content-Disposition",
  //         `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
  //       );
  //       res.send(buffer);
  //     } else {
  //       res.json({ message: "Không tồn tại kết quả tìm kiếm" });
  //     }
  //   } catch (error: any) {
  //     res.json({ message: error.message });
  //   }
  // }
}
