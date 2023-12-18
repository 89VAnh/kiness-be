import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  LicenseOfInventionModel,
  SearchLicenseOfInventionModel,
} from "../models/license_of_invention";
import { LicenseOfInventionService } from "../services/licenseOfInventionService";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";

@injectable()
export class LicenseOfInventionController {
  constructor(private licenseOfInventionService: LicenseOfInventionService) {}

  async createLicenseOfInvention(req: Request, res: Response): Promise<any> {
    try {
      const os_model = req.body as LicenseOfInventionModel;
      await this.licenseOfInventionService.createLicenseOfInvention(os_model);
      res.json({ message: "Đã thêm thành công", success: true });
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

  async updateLicenseOfInvention(req: Request, res: Response): Promise<any> {
    try {
      const os_model = req.body as LicenseOfInventionModel;
      await this.licenseOfInventionService.updateLicenseOfInvention(os_model);
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

  async deleteLicenseOfInvention(req: Request, res: Response): Promise<any> {
    try {
      const params = req.body as { license_id: number; lu_user_id: string };
      await this.licenseOfInventionService.deleteLicenseOfInvention(
        params.license_id,
        params.lu_user_id,
      );
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

  async getDetailLicenseOfInvention(req: Request, res: Response): Promise<any> {
    try {
      const obesity_story_id = Number(req.params.id);
      const data =
        await this.licenseOfInventionService.getDetailLicenseOfInvention(
          obesity_story_id,
        );
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

  async searchLicenses(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchLicenseOfInventionModel;
      const data = await this.licenseOfInventionService.SearchLicenses(object);
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
