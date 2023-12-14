import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { GrowthArticleService } from "../services/growthArticleService";
import {
  GrowthArticleModel,
  SearchClientGrowthArticleModel,
  SearchGrowthArticleModel,
} from "../models/growth-article";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";

@injectable()
export class GrowthArticleController {
  constructor(private growthArticleService: GrowthArticleService) {}

  async createGrowthArticle(req: Request, res: Response): Promise<any> {
    try {
      const ga_model = req.body as GrowthArticleModel;
      await this.growthArticleService.createGrowthArticle(ga_model);
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

  async updateGrowthArticle(req: Request, res: Response): Promise<any> {
    try {
      const ga_model = req.body as GrowthArticleModel;
      await this.growthArticleService.updateGrowthArticle(ga_model);
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

  async updateViewCountGrowthArticle(
    req: Request,
    res: Response,
  ): Promise<any> {
    try {
      const growth_article_id = Number(req.params.id);
      await this.growthArticleService.updateViewCountGrowthArticle(
        growth_article_id,
      );
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

  async deleteGrowthArticle(req: Request, res: Response): Promise<any> {
    try {
      const growth_article_id = Number(req.params.id);
      await this.growthArticleService.deleteGrowthArticle(growth_article_id);
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

  async getDetailGrowthArticle(req: Request, res: Response): Promise<any> {
    try {
      const growth_article_id = Number(req.params.id);
      const data =
        await this.growthArticleService.getDetailGrowthArticle(
          growth_article_id,
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

  async getDetailClientGrowthArticle(
    req: Request,
    res: Response,
  ): Promise<any> {
    try {
      const growth_article_id = Number(req.params.id);
      const data =
        await this.growthArticleService.getDetailClientGrowthArticle(
          growth_article_id,
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

  async searchGrowthArticles(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchGrowthArticleModel;
      const data = await this.growthArticleService.searchGrowthArticles(object);
      if (data) {
        var results = {
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

  async searchClientGrowthArticles(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchClientGrowthArticleModel;
      const data =
        await this.growthArticleService.searchClientGrowthArticles(object);
      if (data) {
        var results = {
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
