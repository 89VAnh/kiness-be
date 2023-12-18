import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  ArticleAuthor,
  ArticleAuthorSearchParams,
} from "../models/article-author";
import { ArticleAuthorService } from "../services/articleAuthorService";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class ArticleAuthorController {
  constructor(private articleAuthorService: ArticleAuthorService) {}

  async getArticleAuthorById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const articleAuthor =
        await this.articleAuthorService.getArticleAuthorById(Number(id));
      if (articleAuthor) {
        res.json(articleAuthor);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createArticleAuthor(req: Request, res: Response): Promise<void> {
    try {
      const articleAuthor = req.body as ArticleAuthor;
      await this.articleAuthorService.createArticleAuthor(articleAuthor);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateArticleAuthor(req: Request, res: Response): Promise<void> {
    try {
      const articleAuthor = req.body as ArticleAuthor;
      await this.articleAuthorService.updateArticleAuthor(articleAuthor);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteArticleAuthor(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body.data as { list_json: any; updated_by_id: string };
      await this.articleAuthorService.deleteArticleAuthor(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchArticleAuthor(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as ArticleAuthorSearchParams;
      const data: any =
        await this.articleAuthorService.searchArticleAuthor(object);
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

  async getArticleAuthorDropdown(_req: Request, res: Response): Promise<any> {
    try {
      var data = await this.articleAuthorService.getArticleAuthorDropdown();
      res.json({ data: data, success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }
}
