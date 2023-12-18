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
        page_index: number;
        page_size: number;
        search_content: string;
        news_title: string;
        content: string;
      };
      const data: any = await this.newsService.searchNews(
        object.page_index,
        object.page_size,
        object.search_content,
        object.news_title,
        object.content,
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
