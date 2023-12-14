import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { SlideService } from "../services/slideService";
import { Slide } from "../models/slide";

@injectable()
export class SlideController {
  constructor(private slideService: SlideService) {}

  async getSlideDropdown(_: Request, res: Response): Promise<void> {
    try {
      const data = await this.slideService.getSlideDropdown();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getSlideById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const slide = await this.slideService.getSlideById(id);
      if (slide) {
        res.json(slide);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createSlide(req: Request, res: Response): Promise<void> {
    try {
      const slide = req.body as Slide;
      await this.slideService.createSlide(slide);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateSlide(req: Request, res: Response): Promise<void> {
    try {
      const slide = req.body as Slide;
      await this.slideService.updateSlide(slide);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteSlide(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.slideService.deleteSlide(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchSlide(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        slideIndex: number;
        slideSize: number;
        search_content: string;
      };
      const data: any = await this.slideService.searchSlide(
        object.slideIndex,
        object.slideSize,
        object.search_content,
      );
      if (data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          slide: object.slideIndex,
          slideSize: object.slideSize,
          data: data,
          slideCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.slideSize ? object.slideSize : 1),
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
