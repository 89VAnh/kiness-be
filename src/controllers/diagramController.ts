import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { DiagramModel, SearchNodesModel } from "../models/diagram";
import { DiagramService } from "../services/diagramService";

@injectable()
export class DiagramController {
  constructor(private diagramService: DiagramService) {}

  async getNodeById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const diagram = await this.diagramService.getNodeById(id);
      if (diagram) {
        res.json({ data: diagram, success: true });
      } else {
        res.json({ message: "Bản ghi không tồn tại", success: false });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async createNode(req: Request, res: Response): Promise<void> {
    try {
      const diagram = req.body as DiagramModel;
      await this.diagramService.createNode(diagram);
      res.json({ message: "Đã thêm thành công", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateNode(req: Request, res: Response): Promise<void> {
    try {
      const diagram = req.body as DiagramModel;
      await this.diagramService.updateNode(diagram);
      res.json({ message: "Đã cập nhật thành công", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteNode(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any };
      await this.diagramService.deleteNode(object.list_json);
      res.json({ message: "Đã xóa thành công", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async searchNodes(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchNodesModel;
      const data: any = await this.diagramService.searchNodes(object);
      if (data) {
        let results = {
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
      res.json({ message: error.message });
    }
  }
}
