import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { News } from "../models/news";
import { NewsService } from "../services/newsService";

@injectable()
export class NewsController {
  constructor(private newsService: NewsService) {}

  async getNewsById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const news = await this.newsService.getNewsById(id);
      if (news) {
        res.json(news);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createNews(req: Request, res: Response): Promise<void> {
    try {
      const news = req.body as News;
      await this.newsService.createNews(news);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateNews(req: Request, res: Response): Promise<void> {
    try {
      const news = req.body as News;
      await this.newsService.updateNews(news);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteNews(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.newsService.deleteNews(object.list_json, object.updated_by_id);
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchNews(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        news_title: string;
        content: string;
      };
      const data: any = await this.newsService.searchNews(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.news_title,
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
