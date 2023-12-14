import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { FAQTopicService } from "../services/faqTopicService";
import { FAQTopic, SearchFAQTopicsModel } from "../models/faq-topic";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class FAQTopicController {
  constructor(private faqTopicService: FAQTopicService) {}

  async createFAQTopic(req: Request, res: Response): Promise<any> {
    try {
      const faqTopic = req.body as FAQTopic;
      await this.faqTopicService.createFAQTopic(faqTopic);
      res.json({ message: "Đã thêm thành công", success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }

  async updateFAQTopic(req: Request, res: Response): Promise<any> {
    try {
      const faqTopic = req.body as FAQTopic;
      await this.faqTopicService.updateFAQTopic(faqTopic);
      res.json({ message: "Cập nhật thành công", success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }

  async getFAQTopic(req: Request, res: Response): Promise<any> {
    try {
      const topic_id = Number(req.params.id);
      var data = await this.faqTopicService.getFAQTopic(topic_id);
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

  async deleteFAQTopic(req: Request, res: Response): Promise<any> {
    try {
      const topic_id = Number(req.params.id);
      await this.faqTopicService.deleteFAQTopic(topic_id);
      res.json({ message: "Đã xóa thành công", success: true });
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        res.json({ message: error.message, success: false });
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }

  async getFAQTopicDropdown(_req: Request, res: Response): Promise<any> {
    try {
      var data = await this.faqTopicService.getFAQTopicDropdown();
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

  async searchFAQTopics(req: Request, res: Response): Promise<any> {
    try {
      var object = req.body as SearchFAQTopicsModel;
      var data = await this.faqTopicService.searchFAQTopics(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.topic_id,
      );

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
      } else {
        console.log(error.message);
        res.json({ message: "Đã xảy ra lỗi", success: false });
      }
    }
  }
}
