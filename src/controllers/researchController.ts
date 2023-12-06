import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Researcher } from "../models/researcher";
import { ResearcherService } from "../services/researcherService";

@injectable()
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  async getResearcherById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const researcher = await this.researcherService.getResearcherById(id);
      if (researcher) {
        res.json(researcher);
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async createResearcher(req: Request, res: Response): Promise<void> {
    try {
      const researcher = req.body as Researcher;
      await this.researcherService.createResearcher(researcher);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateResearcher(req: Request, res: Response): Promise<void> {
    try {
      const researcher = req.body as Researcher;
      await this.researcherService.updateResearcher(researcher);
      res.json({ message: "Đã cập nhật thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async deleteResearcher(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.researcherService.deleteResearcher(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchResearcher(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        researcher_title: string;
        content: string;
      };
      const data: any = await this.researcherService.searchResearcher(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.researcher_title,
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
