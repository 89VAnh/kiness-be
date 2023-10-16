import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CityService } from "../services/cityService";
import { City } from "../models/city";

@injectable()
export class CityController {
  constructor(private cityService: CityService) {}

  async getCityDropdown(_: Request, res: Response): Promise<void> {
    try {
      const data = await this.cityService.getCityDropdown();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getCityById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const city = await this.cityService.getCityById(id);
      if (city) {
        res.json(city);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createCity(req: Request, res: Response): Promise<void> {
    try {
      const city = req.body as City;
      await this.cityService.createCity(city);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateCity(req: Request, res: Response): Promise<void> {
    try {
      const city = req.body as City;
      await this.cityService.updateCity(city);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.cityService.deleteCity(object.list_json, object.updated_by_id);
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchCity(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        city_name: string;
        code: string;
      };
      const data: any = await this.cityService.searchCity(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.city_name,
        object.code,
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
