import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { BookAuthorModel, SearchBookAuthorModel } from "../models/book-author";
import { BookAuthorService } from "../services/bookAuthorService";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";

@injectable()
export class BookAuthorController {
  constructor(private bookAuthorService: BookAuthorService) {}

  async createBookAuthor(req: Request, res: Response): Promise<any> {
    try {
      const ba_model = req.body as BookAuthorModel;
      await this.bookAuthorService.createBookAuthor(ba_model);
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

  async updateBookAuthor(req: Request, res: Response): Promise<any> {
    try {
      const ba_model = req.body as BookAuthorModel;
      await this.bookAuthorService.updateBookAuthor(ba_model);
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

  async deleteBookAuthor(req: Request, res: Response): Promise<any> {
    try {
      const params = req.body as { author_id: number; lu_user_id: string };
      await this.bookAuthorService.deleteBookAuthor(
        params.author_id,
        params.lu_user_id,
      );
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

  async getDetailBookAuthor(req: Request, res: Response): Promise<any> {
    try {
      const author_id = Number(req.params.id);
      const data = await this.bookAuthorService.getDetailBookAuthor(author_id);
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

  async searchBookAuthors(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchBookAuthorModel;
      const data = await this.bookAuthorService.searchBookAuthors(object);
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

  async getBookAuthorDropdown(_req: Request, res: Response): Promise<any> {
    try {
      var data = await this.bookAuthorService.getBookAuthorDropDown();
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
