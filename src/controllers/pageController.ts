import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { PageService } from "../services/pageService";
import { Page } from "../models/page";

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
        pageIndex: number;
        pageSize: number;
        search_content: string;
        page_title: string;
        page_code: string;
        content: string;
      };
      const data: any = await this.pageService.searchPage(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.page_title,
        object.page_code,
        object.content,
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
