import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  ResearchArticle,
  ResearchArticleSearchParams,
} from "../models/research-article";
import { ResearchArticleService } from "../services/researchArticleService";

@injectable()
export class ResearchArticleController {
  constructor(private researchArticleService: ResearchArticleService) {}

  async getResearchArticleById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const researchArticle =
        await this.researchArticleService.getResearchArticleById(Number(id));
      if (researchArticle) {
        res.json(researchArticle);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createResearchArticle(req: Request, res: Response): Promise<void> {
    try {
      const researchArticle = req.body as ResearchArticle;
      await this.researchArticleService.createResearchArticle(researchArticle);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateResearchArticle(req: Request, res: Response): Promise<void> {
    try {
      const researchArticle = req.body as ResearchArticle;
      await this.researchArticleService.updateResearchArticle(researchArticle);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteResearchArticle(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body.data as { list_json: any; updated_by_id: string };
      await this.researchArticleService.deleteResearchArticle(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchResearchArticle(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as ResearchArticleSearchParams;
      const data: any =
        await this.researchArticleService.searchResearchArticle(object);
      if (data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: object.page_index,
          pageSize: object.page_size,
          data: data,
          pageCount: Math.ceil(
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
