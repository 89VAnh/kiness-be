import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { City, SearchCity } from "../models/city";
import { CityService } from "../services/cityService";

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
      const object = req.body as { list_json: any; lu_user_id: string };
      await this.cityService.deleteCity(object.list_json, object.lu_user_id);
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchCity(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as SearchCity;
      const data: any = await this.cityService.searchCity(object);
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
