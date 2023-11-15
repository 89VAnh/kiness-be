import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  ExperienceRegister,
  SearchExperienceRegister,
} from "../models/experience-register";
import { ExperienceRegisterService } from "../services/experienceRegisterService";

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

  async updateExperienceRegister(req: Request, res: Response): Promise<void> {
    try {
      const experienceRegister = req.body as ExperienceRegister;
      await this.experienceService.updateExperienceRegister(experienceRegister);
      res.json({ message: "Đã sửa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateExperienceRegisterStatus(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const experienceRegister = req.body as ExperienceRegister;
      await this.experienceService.updateExperienceRegisterStatus(
        experienceRegister,
      );
      res.json({ message: "Đã thay đổi trạng thái thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchExperienceRegister(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchExperienceRegister;
      const data: any =
        await this.experienceService.searchExperienceRegister(object);
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

  async printExperienceRegister(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchExperienceRegister;
      const buffer: any =
        await this.experienceService.printExperienceRegister(object);
      if (buffer) {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        );

        const filename = "Danh sách đơn đăng ký trải nghiệm";
        res.setHeader(
          "Content-Disposition",
          `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        );
        res.send(buffer);
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
}
