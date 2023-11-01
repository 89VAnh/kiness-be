import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { ExperienceRegister } from "../models/experience-register";
import { ExperienceRegisterService } from "../services/experienceRegister";

@injectable()
export class ExperienceRegisterController {
  constructor(private experienceService: ExperienceRegisterService) {}

  async createExperienceRegister(req: Request, res: Response): Promise<void> {
    try {
      const experienceRegister = req.body as ExperienceRegister;
      await this.experienceService.createExperienceRegister(experienceRegister);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchExperienceRegister(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        branch_name: string;
        phone: string;
        address: string;
      };
      const data: any = await this.experienceService.searchExperienceRegister(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.branch_name,
        object.phone,
        object.address,
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

  async deleteExperienceRegister(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.experienceService.deleteExperienceRegister(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }
}
