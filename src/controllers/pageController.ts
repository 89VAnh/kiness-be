import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Page } from "../models/page";
import { PageService } from "../services/pageService";

@injectable()
export class PageController {
  constructor(private pageService: PageService) {}

  async getPageDropdown(_: Request, res: Response): Promise<void> {
    try {
      const data = await this.pageService.getPageDropdown();
      if (data && data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "Không lấy được danh sách" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async getPageById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const page = await this.pageService.getPageById(id);
      if (page) {
        res.json(page);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createPage(req: Request, res: Response): Promise<void> {
    try {
      const page = req.body as Page;
      await this.pageService.createPage(page);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updatePage(req: Request, res: Response): Promise<void> {
    try {
      const page = req.body as Page;
      await this.pageService.updatePage(page);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deletePage(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.pageService.deletePage(object.list_json, object.updated_by_id);
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchPage(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        page_index: number;
        page_size: number;
        search_content: string;
      };
      const data: any = await this.pageService.searchPage(
        object.page_index,
        object.page_size,
        object.search_content,
      );
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
