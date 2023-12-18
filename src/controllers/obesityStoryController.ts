import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  ObesityStoryModel,
  SearchClientObesityStoryModel,
  SearchObesityStoryModel,
} from "../models/obesity-story";
import { ObesityStoryService } from "../services/obesityStoryService";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";

@injectable()
export class ObesityStoryController {
  constructor(private obesityStoryService: ObesityStoryService) {}

  async createObesityStory(req: Request, res: Response): Promise<any> {
    try {
      const os_model = req.body as ObesityStoryModel;
      await this.obesityStoryService.createObesityStory(os_model);
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

  async updateObesityStory(req: Request, res: Response): Promise<any> {
    try {
      const os_model = req.body as ObesityStoryModel;
      await this.obesityStoryService.updateObesityStory(os_model);
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

  async updateViewCountObesityStory(req: Request, res: Response): Promise<any> {
    try {
      const obesity_story_id = Number(req.params.id);
      await this.obesityStoryService.updateViewCountObesityStory(
        obesity_story_id,
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

  async deleteObesityStory(req: Request, res: Response): Promise<any> {
    try {
      const obesity_story_id = Number(req.params.id);
      await this.obesityStoryService.deleteObesityStory(obesity_story_id);
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

  async getDetailObesityStory(req: Request, res: Response): Promise<any> {
    try {
      const obesity_story_id = Number(req.params.id);
      const data =
        await this.obesityStoryService.getDetailObesityStory(obesity_story_id);
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

  async getDetailClientObesityStory(req: Request, res: Response): Promise<any> {
    try {
      const obesity_story_id = Number(req.params.id);
      const data =
        await this.obesityStoryService.getDetailClientObesityStory(
          obesity_story_id,
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

  async searchObesityStories(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchObesityStoryModel;
      const data = await this.obesityStoryService.searchObesityStories(object);
      if (data) {
        var results = {
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

  async searchClientObesityStories(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchClientObesityStoryModel;
      const data =
        await this.obesityStoryService.searchClientObesityStories(object);
      if (data) {
        var results = {
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
