import { Request, Response } from "express";
import { injectable } from "tsyringe";
import {
  PostureStoryModel,
  SearchClientPostureStoryModel,
  SearchPostureStoryModel,
} from "../models/posture-story";
import { PostureStoryService } from "../services/postureStoryService";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";

@injectable()
export class PostureStoryController {
  constructor(private postureStoryService: PostureStoryService) {}

  async createPostureStory(req: Request, res: Response): Promise<any> {
    try {
      const ps_model = req.body as PostureStoryModel;
      await this.postureStoryService.createPostureStory(ps_model);
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

  async updatePostureStory(req: Request, res: Response): Promise<any> {
    try {
      const ps_model = req.body as PostureStoryModel;
      await this.postureStoryService.updatePostureStory(ps_model);
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

  async updateViewCountPostureStory(req: Request, res: Response): Promise<any> {
    try {
      const posture_story_id = Number(req.params.id);
      await this.postureStoryService.updateViewCountPostureStory(
        posture_story_id,
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

  async deletePostureStory(req: Request, res: Response): Promise<any> {
    try {
      const posture_story_id = Number(req.params.id);
      await this.postureStoryService.deletePostureStory(posture_story_id);
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

  async getDetailPostureStory(req: Request, res: Response): Promise<any> {
    try {
      const posture_story_id = Number(req.params.id);
      const data =
        await this.postureStoryService.getDetailPostureStory(posture_story_id);
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

  async getDetailClientPostureStory(req: Request, res: Response): Promise<any> {
    try {
      const posture_story_id = Number(req.params.id);
      const data =
        await this.postureStoryService.getDetailClientPostureStory(
          posture_story_id,
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

  async searchPostureStories(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchPostureStoryModel;
      const data = await this.postureStoryService.searchPostureStories(object);
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

  async searchClientPostureStories(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchClientPostureStoryModel;
      const data =
        await this.postureStoryService.searchClientPostureStories(object);
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
